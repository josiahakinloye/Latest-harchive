const mongoose = require('mongoose');
const user = require('./schema');
// let db;

function doFriendAlreadyExist(user1,user2){
  let resultantIndex = {
    user1:0,
    user2:0
  };
  return new Promise(function(resolve,reject){
    // if length is 0 then map will not work. if any of 2 users have length 0 means they are not friends.
    if(user1.friend_list.length != 0 && user2.friend_list.length != 0){
      user1.friend_list.map((friend,index)=>{
        if(friend.friend_username == user2.username){
          // resolve(index);
          resultantIndex.user1 = index;
          user2.friend_list.map((friend2,index2)=>{
            if(friend2.friend_username == user1.username){
              resultantIndex.user2 = index2;
              resolve(resultantIndex);
            }
          })
        }else{
          resolve("not found");
        }
      })
    }else{
      resolve("not found");
    }        
  })
}

function addFriend(friend_request_sender,friend_request_receiver){
  let sender_username = friend_request_sender;
  let receiver_username = friend_request_receiver;  
  return new Promise(function(resolve,reject){
    try{
      mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
      let db = mongoose.connection;      
      db.once('open', function() {
        user.find({username:[sender_username,receiver_username]},function(err,users){
          if(err){
            resolve({status:"error",payload:"error while finding user"});
          }else{                        
            if(users.length == 2){
              if(users[0].username == sender_username){ // check if users[0] is the sender
                doFriendAlreadyExist(users[0],users[1]).then(function(index){ // check if the receiver_username is not already in the list hence avoiding duplication of records.                  
                  if(index == "not found"){
                    users[0].friend_list.push({
                      friend_username:receiver_username,
                      remove_friend : false,
                      friend_request_status : "waiting"  // sender should not get accept friend request button                                        
                    });
      
                    users[1].friend_list.push({
                        friend_username:sender_username,
                        remove_friend : false,
                        friend_request_status : "pending"                                                                                    
                    });

                    //save to database
                    users[0].save().then(item => {                    
                      users[1].save().then(item => {
                        resolve({status:"success",payload:"friend request sent successfully"});
                      })
                      .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                      });
                    })
                    .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                    });
                  }else{
                    users[0].friend_list[index.user1].remove_friend = false;
                    users[0].friend_list[index.user1].friend_request_status = "waiting";
                    users[1].friend_list[index.user2].remove_friend = false;
                    users[1].friend_list[index.user2].friend_request_status = "pending";

                    users[0].save().then(item => {                    
                      users[1].save().then(item => {
                        resolve({status:"success",payload:"friend request sent successfully"});
                      })
                      .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                      });
                    })
                    .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                    });
                  }                       
                })                              
              }else{
                // users[0] is receiver
                doFriendAlreadyExist(users[0],users[1]).then(function(index){                  
                  if(index == "not found"){
                    users[0].friend_list.push({
                      friend_username:sender_username,
                      remove_friend : false,
                      friend_request_status : "pending"  
                    });
    
                    users[1].friend_list.push({
                        friend_username:receiver_username,
                        remove_friend : false,
                        friend_request_status : "waiting"                                                                                    
                    });

                    users[0].save().then(item => {                    
                      users[1].save().then(item => {
                        resolve({status:"success",payload:"friend request sent successfully"});
                      })
                      .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                      });
                    })
                    .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                    });
                  }else{
                    users[0].friend_list[index.user1].remove_friend = false;
                    users[0].friend_list[index.user1].friend_request_status = "pending";
                    users[1].friend_list[index.user2].remove_friend = false;
                    users[1].friend_list[index.user2].friend_request_status = "waiting";

                    users[0].save().then(item => {                    
                      users[1].save().then(item => {
                        resolve({status:"success",payload:"friend request sent successfully"});
                      })
                      .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                      });
                    })
                    .catch(err => {
                        resolve({status:"error",payload:"unable to sent request. Please try again later"});
                    });
                  }
                })                                     
              }
            }else{
                resolve({status:"error",payload:"Users not found."});
            }            
          }            
        })                
      });
    }catch(err){
      resolve({status:"error",payload:err.toString()});
    }
  })      
}

exports.addFriend = addFriend;


function acceptFriendRequest(friend_request_sender,friend_request_receiver){
  let sender_username = friend_request_sender;
  let receiver_username = friend_request_receiver;  
  return new Promise(function(resolve,reject){
    try{
      mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
      let db = mongoose.connection;    
      db.once('open', function() {
        user.find({username:[sender_username,receiver_username]},function(err,users){
          if(err){
            resolve({status:"error",payload:"error while finding user"});
          }else{                      
            // use or in if statement which will reduce logic.
            
            if(users.length == 2){      
              if(users[0].username == sender_username){
                users[0].friend_list.map((eachFriend,index)=>{                    
                  if(eachFriend.friend_username == receiver_username){                        
                      eachFriend.friend_request_status = "accepted";                                            
                  }
                });
                
                users[1].friend_list.map((eachFriend,index)=>{                                                
                  if(eachFriend.friend_username == sender_username){                        
                    eachFriend.friend_request_status = "accepted";                                                              
                  }
                });

                users[0].save().then(item => {                    
                  users[1].save().then(item => {
                    resolve({status:"success",payload:"friend request accepted."});
                  })
                  .catch(err => {
                    resolve({status:"error",payload:"unable to accept friend request. Please try again later"});
                  });
                })
                .catch(err => {
                  resolve({status:"error",payload:"unable to accept friend request. Please try again later"});
                });
              }else{
                users[0].friend_list.map((eachFriend,index)=>{                    
                  if(eachFriend.friend_username == sender_username){                        
                      eachFriend.friend_request_status = "accepted";                                            
                  }
                });
                
                users[1].friend_list.map((eachFriend,index)=>{                                                
                  if(eachFriend.friend_username == receiver_username){                        
                    eachFriend.friend_request_status = "accepted";                                                              
                  }
                });

                users[0].save().then(item => {                    
                  users[1].save().then(item => {
                    resolve({status:"success",payload:"friend request accepted."});
                  })
                  .catch(err => {
                    resolve({status:"error",payload:"unable to accept friend request. Please try again later"});
                  });
                })
                .catch(err => {
                  resolve({status:"error",payload:"unable to accept friend request. Please try again later"});
                });
              }                                                                                   
            }else{
                resolve({status:"error",payload:"Users not found."});
            }            
          }            
        })                
      });
    }catch(err){
      resolve({status:"error",payload:err.toString()});
    }
  })      
}

exports.acceptFriendRequest = acceptFriendRequest;


function removeFriend(friend_request_sender,friend_request_receiver){
  let sender_username = friend_request_sender;
  let receiver_username = friend_request_receiver;  
  return new Promise(function(resolve,reject){
    try{
      mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
      let db = mongoose.connection;      
      db.once('open', function() {
        user.find({username:[sender_username,receiver_username]},function(err,users){
          if(err){
            resolve({status:"error",payload:"error while finding user"});
          }else{                        
            if(users.length == 2){
              if(users[0].username == sender_username){
                users[0].friend_list.map((eachFriend,index)=>{            
                  if(eachFriend.friend_username == receiver_username){                        
                      eachFriend.remove_friend = true;    
                      eachFriend.friend_request_status = "deleted";                 
                  }
                });
                
                users[0].assets.map((singleAsset,index)=>{            
                  if(singleAsset.beneficiary_name == receiver_username && singleAsset.asset_transfered == false){                        
                      singleAsset.beneficiary_name = "";
                      singleAsset.wallet_address = "";
                  }
                });

                users[1].friend_list.map((eachFriend,index)=>{            
                  if(eachFriend.friend_username == sender_username){                        
                      eachFriend.remove_friend = true;                      
                      eachFriend.friend_request_status = "deleted";
                  }
                });

                users[1].assets.map((singleAsset,index)=>{            
                  if(singleAsset.beneficiary_name == sender_username && singleAsset.asset_transfered == false){                         
                      singleAsset.beneficiary_name = "";
                      singleAsset.wallet_address = "";
                  }
                });

                users[0].save().then(item => {                    
                  users[1].save().then(item => {
                    resolve({status:"success",payload:"friend removed."});
                  })
                  .catch(err => {
                    resolve({status:"error",payload:"unable to remove your friend"});
                  });
                })
                .catch(err => {
                  resolve({status:"error",payload:"unable to remove your friend"});
                });    

              }else{
                users[0].friend_list.map((eachFriend,index)=>{            
                  if(eachFriend.friend_username == sender_username){                        
                      eachFriend.remove_friend = true;    
                      eachFriend.friend_request_status = "deleted";                 
                  }
                }); 

                users[0].assets.map((singleAsset,index)=>{            
                  if(singleAsset.beneficiary_name == sender_username && singleAsset.asset_transfered == false){                        
                      singleAsset.beneficiary_name = "";
                  }
                });

                users[1].friend_list.map((eachFriend,index)=>{            
                  if(eachFriend.friend_username == receiver_username){                        
                      eachFriend.remove_friend = true;                      
                      eachFriend.friend_request_status = "deleted";
                  }
                });

                users[1].assets.map((singleAsset,index)=>{            
                  if(singleAsset.beneficiary_name == receiver_username && singleAsset.asset_transfered == false){                        
                      singleAsset.beneficiary_name = "";
                  }
                });

                users[0].save().then(item => {                    
                  users[1].save().then(item => {
                    resolve({status:"success",payload:"friend removed."});
                  })
                  .catch(err => {
                    resolve({status:"error",payload:"unable to remove your friend"});
                  });
                })
                .catch(err => {
                  resolve({status:"error",payload:"unable to remove your friend"});
                });    
              }                                          
            }else{
                resolve({status:"error",payload:"Users not found."});
            }            
          }            
        })                
      });
    }catch(err){
      resolve({status:"error",payload:err.toString()});
    }
  })      
}

exports.removeFriend = removeFriend;