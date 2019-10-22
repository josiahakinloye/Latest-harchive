// NEED TO CHANGE WALLET ADDRESS TO SENDER_WALLET_ADDRESS AND RECEIVER_WALLET_ADDRESS.

const mongoose = require('mongoose');
const user = require('./schema');
// const email = require('./email');

function deleteAsset(username,id){
    let requestUser = username;
    let assetId = id;
    return new Promise(function(resolve,reject){
      try{
        mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
        let db = mongoose.connection;
        // db.on('error', resolve({status:"error",payload:"there was some error in binding connection"}));
        db.once('open', function() {
          user.find({username:requestUser},function(err,users){
            if(err){
              resolve({status:"error",payload:"error while finding user"});
            }else{                        
              if(users.length == 1){
                let totalAssets = users[0].assets;
                totalAssets.map((singleAsset,index)=>{            
                    if(singleAsset._id == assetId){                        
                        singleAsset.asset_deleted = true;
                        users[0].save().then(item => {
                            resolve({status:"success",payload:"asset deleted successfull"});
                        })
                        .catch(err => {
                            resolve({status:"error",payload:"asset could not be deleted. Please try again later."});
                        }); 
                        // break;       
                    }
                });                              
              }else{
                resolve({status:"error",payload:"user not found"});
              }            
            }
          })        
        });
      }catch(err){
        resolve({status:"error",payload:err.toString()});
      }
    })
  }
  
exports.deleteAsset = deleteAsset;


function createDigitalAsset(assetDetails){
  let asset = assetDetails;

  return new Promise(function(resolve,reject){
      try{
        mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
        let db = mongoose.connection;
        db.once('open', function() {
          user.find({username:asset.username},function(err,users){
            if(err){
              resolve({status:"error",payload:"error while finding user"});
            }else{                        
              if(users.length == 1){
                let assetRawObject = {
                  asset_name:asset.asset_name,
                  beneficiary_name:asset.beneficiary_name,
                  sender_wallet_address:asset.sender_wallet_address,
                  sender_private_key:asset.sender_private_key,
                  receiver_wallet_address:asset.receiver_wallet_address,
                  asset_contract_address:asset.contract_address,
                  asset_creation_date: new Date(),
                  deadline:asset.deadline,
                  description:asset.description,
                  others:asset.others,
                  asset_detail:{
                    type_of_asset:asset.asset_detail.type_of_asset,
                    asset_attributes:asset.asset_detail.asset_attributes
                  }
                };

                users[0].assets.push(assetRawObject);
                users[0].save().then(item => {
                  resolve({status:"success",payload:"Asset created successfully"});
                })
                .catch(err => {
                  resolve({status:"error",payload:"unable to save asset to database"});
                });
              }else{
                resolve({status:"error",payload:"user not found"});
              }            
            }
          })
        });
      }catch(err){
        resolve({status:"error",payload:err.toString()});
      }
  })   
}

exports.createDigitalAsset = createDigitalAsset;


function createRealAssets(requestParameters){
  let asset_images = requestParameters.asset_images;  
  let asset = requestParameters.other_form_fields;
  return new Promise(function(resolve,reject){
    try{
      mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
      let db = mongoose.connection;
      // db.on('error', resolve({status:"error",payload:"there was some error in binding connection"}));
      db.once('open', function() {
        user.find({username:asset.username},function(err,users){
          if(err){
            resolve({status:"error",payload:"error while finding unique users"});
          }else{                        
            if(users.length == 1){              
              let assetDetails = {
                asset_name : asset.asset_name,
                beneficiary_name : asset.beneficiary_name,
                sender_wallet_address:asset.sender_wallet_address,
                sender_private_key:asset.sender_private_key,
                receiver_wallet_address:asset.receiver_wallet_address,
                asset_contract_address:asset.contract_address,
                asset_creation_date : new Date(),
                deadline : asset.deadline,
                description : asset.description,
                others : asset.others,
                asset_detail : {
                  type_of_asset:"real",
                  asset_attributes:asset_images
                }
              };              
              users[0].assets.push(assetDetails);
              users[0].save().then((item)=>{
                resolve({status:"success",payload:"Asset created successfully"});
              }).catch(err => {
                resolve({status:"error",payload:"unable to save asset to database"});
              });              
            }else{
              resolve({status:"error",payload:"user not found."});
            }            
          }
        })        
      });
    }catch(err){
      resolve({status:"error",payload:err.toString()});
    }
  })      
}

exports.createRealAssets = createRealAssets;


function removeAssetFromOwner(singleUser,id){  
  let owner = singleUser;
  let assetId = id;
  return new Promise(function(resolve,reject){
    owner.assets.map((singleAsset,index)=>{      
      if(singleAsset._id == assetId && singleAsset.asset_deleted == false  && singleAsset.asset_transfered == false){
        if(singleAsset.beneficiary_name == "" || singleAsset.beneficiary_name == undefined || singleAsset.beneficiary_name == null){
          resolve({status:"error",payload:"unable to transfer asset. Please add beneficiary first"});
        }else{
          singleAsset.asset_transfered = true;
          owner.save().then((item)=>{
            email.assetSender(owner.email,singleAsset);
            resolve({status:"success",payload:{asset:singleAsset,previous_owner:owner}});
          }).catch(err => {
            resolve({status:"error",payload:"unable to transfer asset."});
          });
        }                              
      }
    })
  })
}

function addAssetToNewOwner(transfering_asset_details){  
  let previous_owner = transfering_asset_details.previous_owner;
  let oldAsset = transfering_asset_details.asset;
  let newOwner = oldAsset.beneficiary_name;
  return new Promise(function(resolve,reject){
    mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
    let db = mongoose.connection;      
    db.once('open', function() {
      user.find({username:newOwner},function(err,users){
        if(err){
          resolve({status:"error",payload:"error while finding new owner"});
        }else{          
          if(users.length == 1){
            let newAsset = {
              asset_name : oldAsset.asset_name,
              beneficiary_name : "",
              previous_owner:previous_owner,
              sender_wallet_address : oldAsset.receiver_wallet_address,
              sender_private_key:"",
              receiver_wallet_address:"",
              asset_contract_address:oldAsset.asset_contract_address,
              asset_creation_date : new Date(),
              deadline : "",
              description : oldAsset.description,
              others : oldAsset.others,
              asset_detail : oldAsset.asset_detail,
              asset_transfered : false,
              asset_deleted : false
            };            

            users[0].assets.push(newAsset);

            users[0].save().then((items)=>{
              email.assetReceiver(users[0].email,newAsset);
              resolve({status:"success",payload:"asset saved to beneficiary"});
            }).catch(err => {
              resolve({status:"error",payload:"asset could not be moved. Contact Administrator"});
            })
          }else{
            resolve({status:"error",payload:"no user or multiple users found"});
          }
        }
      })
    })
  })  
}

function transferAsset(username,asset_id){
  let asset_user = username;
  let assetId = asset_id;
  return new Promise(function(resolve,reject){
    try{
      mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
      let db = mongoose.connection;
      // db.on('error', resolve({status:"error",payload:"there was some error in binding connection"}));
      db.once('open', function() {
        user.find({username:asset_user},function(err,users){
          if(err){
            resolve({status:"error",payload:"error while finding unique users"});
          }else{                           
            if(users.length == 1){
              removeAssetFromOwner(users[0],assetId).then(function(response){              
                if(response.status == "success"){
                  addAssetToNewOwner(response.payload).then(function(response){
                    if(response.status == "success"){
                      resolve({status:"success",payload:response.payload});        
                    }else{
                      resolve({status:"error",payload:response.payload});        
                    }
                  })
                }else{
                  resolve({status:"error",payload:"unable to transfer asset."});    
                }
              })              
            }else{
              resolve({status:"error",payload:"user not found"});
            }
          }
        })        
      });
    }catch(err){
      resolve({status:"error",payload:err.toString()});
    }    
  })
}

exports.transferAsset = transferAsset;

function addBeneficiary(asset_details){
  let assetDetails = {
    username:asset_details.username,
    asset_id:asset_details.asset_id,
    beneficiary_name:asset_details.beneficiary_name,
    receiver_wallet_address:asset_details.receiver_wallet_address,
    deadline:asset_details.deadline
  };  
  return new Promise(function(resolve,reject){
    try{
      mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
      let db = mongoose.connection;
      // db.on('error', resolve({status:"error",payload:"there was some error in binding connection"}));
      db.once('open', function() {
        user.find({username:assetDetails.username},function(err,users){
          if(err){
            resolve({status:"error",payload:"error while finding unique users"});
          }else{                           
            if(users.length == 1){
              users[0].assets.map((singleAsset,index)=>{
                if(singleAsset._id == assetDetails.asset_id && singleAsset.asset_deleted == false && singleAsset.asset_transfered == false){
                  singleAsset.beneficiary_name = assetDetails.beneficiary_name;
                  singleAsset.receiver_wallet_address = assetDetails.receiver_wallet_address;
                  singleAsset.deadline = assetDetails.deadline;
                  users[0].save().then((items)=>{
                    resolve({status:"success",payload:"beneficiary added to asset successfully"});
                  }).catch(err => {
                    resolve({status:"error",payload:"beneficiary could not be added. Please try again later."});
                  })
                }
              })
            }else{
              resolve({status:"error",payload:"user not found"});
            }
          }
        })        
      });
    }catch(err){
      resolve({status:"error",payload:err.toString()});
    }
  })
}

exports.addBeneficiary = addBeneficiary;


function updateRealAsset(object){
  let asset_images = object.asset_images;  
  let formDetails = object.other_form_fields;
  return new Promise(function(resolve,reject){
    mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
    let db = mongoose.connection;
    db.once('open', function() {
      user.find({username:formDetails.username},function(err,users){
        if(err){
          resolve({status:"error",payload:"error while finding unique users"});
        }else{
          if(users.length == 1){
            users[0].assets.map((singleAsset,index)=>{
              if(singleAsset._id == formDetails.asset_id && singleAsset.asset_deleted == false && singleAsset.asset_transfered == false){
                if(Object.prototype.hasOwnProperty.call(formDetails, 'asset_name')){
                  singleAsset.asset_name = formDetails.asset_name;
                }                
                if(Object.prototype.hasOwnProperty.call(formDetails, 'beneficiary_name')){
                  singleAsset.beneficiary_name = formDetails.beneficiary_name;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'receiver_wallet_address')){
                  singleAsset.receiver_wallet_address = formDetails.receiver_wallet_address;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'sender_private_key')){
                  singleAsset.sender_private_key = formDetails.sender_private_key;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'sender_wallet_address')){
                  singleAsset.sender_wallet_address = formDetails.sender_wallet_address;
                }
                if(asset_images.length > 1){
                  singleAsset.asset_detail = {
                    type_of_asset:"real",
                    asset_attributes:asset_images
                  }
                }else{                                                      
                  singleAsset.asset_detail = {
                    type_of_asset:"real",
                    asset_attributes:singleAsset.asset_detail[0].asset_attributes
                  }
                }

                if(Object.prototype.hasOwnProperty.call(formDetails, 'deadline')){
                  singleAsset.deadline = formDetails.deadline;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'description')){
                  singleAsset.description = formDetails.description;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'others')){
                  singleAsset.others = formDetails.others;
                }                
                users[0].save().then((items)=>{
                  resolve({status:"success",payload:"asset updated successfully"});
                }).catch(err => {
                  resolve({status:"error",payload:"Asset could not be updated. Please try again later."});
                })
              }
            })
          }else{
            resolve({status:"error",payload:"user not found"});
          }
        }
      })
    })
  })
}

exports.updateRealAsset = updateRealAsset;


function updateDigitalAsset(object){
  let assetObject = object;
  return new Promise(function(resolve,reject){
    mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
    let db = mongoose.connection;
    db.once('open', function() {
      user.find({username:assetObject.username},function(err,users){
        if(err){
          resolve({status:"error",payload:"error while finding unique users"});
        }else{
          if(users.length == 1){
            users[0].assets.map((singleAsset,index)=>{
              if(singleAsset._id == assetObject.asset_id && singleAsset.asset_deleted == false && singleAsset.asset_transfered == false){
                if(Object.prototype.hasOwnProperty.call(assetObject, 'asset_name')){
                  singleAsset.asset_name = assetObject.asset_name;
                }                
                if(Object.prototype.hasOwnProperty.call(assetObject, 'beneficiary_name')){
                  singleAsset.beneficiary_name = assetObject.beneficiary_name;
                }
                if(Object.prototype.hasOwnProperty.call(assetObject, 'receiver_wallet_address')){
                  singleAsset.wallet_address = assetObject.receiver_wallet_address;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'sender_private_key')){
                  singleAsset.sender_private_key = formDetails.sender_private_key;
                }
                if(Object.prototype.hasOwnProperty.call(formDetails, 'sender_wallet_address')){
                  singleAsset.sender_wallet_address = formDetails.sender_wallet_address;
                }
                if(Object.prototype.hasOwnProperty.call(assetObject, 'asset_detail')){
                  singleAsset.asset_detail = {
                    type_of_asset:"digital",
                    asset_attributes:assetObject.asset_detail.asset_attributes
                  }
                }
                if(Object.prototype.hasOwnProperty.call(assetObject, 'deadline')){
                  singleAsset.deadline = assetObject.deadline;
                }
                if(Object.prototype.hasOwnProperty.call(assetObject, 'description')){
                  singleAsset.description = assetObject.description;
                }
                if(Object.prototype.hasOwnProperty.call(assetObject, 'others')){
                  singleAsset.others = assetObject.others;
                }                
                users[0].save().then((items)=>{
                  resolve({status:"success",payload:"asset updated successfully"});
                }).catch(err => {
                  resolve({status:"error",payload:"Asset could not be updated. Please try again later."});
                })
              }
            })
          }else{
            resolve({status:"error",payload:"user not found"});
          }
        }
      })
    })
  })
}

exports.updateDigitalAsset = updateDigitalAsset;