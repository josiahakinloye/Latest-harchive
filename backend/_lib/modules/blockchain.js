const mongoose = require('mongoose');
const user = require('./schema');
// const newContract = require('./smart-contract/smart-contract-deploy');
var Web3 = require('web3');
var web3 = new Web3('https://ropsten.infura.io/bIAFH6ZgTmvudTPcotKE');


function getEtherBalance(name,walletAddress){
    let username = name; // might not be needed
    let wallet_address = walletAddress;
    return new Promise(function(resolve,reject){
        try{            
            web3.eth.getBalance(walletAddress).then(function(etherBalance){
                resolve({status:"success",payload:web3.utils.fromWei(etherBalance, 'ether')});
            })                        
        }catch(err){
            resolve({status:"error",payload:err.toString()});
        }
    })
}

exports.getEtherBalance = getEtherBalance;

/**
 * 
 * @param {*} asset_details 
 */
function createAssetContract(asset_details){
    let assetDetails = asset_details;
    return new Promise(function(resolve,reject){
      try{
        newContract.deploy(assetDetails).then(function(response){   
            if(response.status == "success"){                
                resolve({status:"success",payload:"Contract created successfully"});
            }else{
                resolve({status:"error",payload:"Error while creating contract on blockchain.Make sure you have enough balance in account."});
            }                              
        })
      }catch(err){
        resolve({status:"error",payload:err.toString()});
      }
    })
  }
  
exports.createAssetContract = createAssetContract;

function setContractData(asset_details){
    let assetDetails = asset_details;
    return new Promise(function(resolve,reject){
        try{
            ContractObject.initiateContract(assetDetails).then(function(contract){
                let user_contract = contract;
                user_contract.methods.setAssetData(assetDetails.asset_name,assetDetails.type_of_asset,assetDetails.receiver_wallet_address).estimateGas(function(err,estimatedGas){
                    if(err){
                        resolve({status:"error",payload:err.toString()});
                    }else{
                        user_contract.methods.setAssetData(assetDetails.asset_name,assetDetails.type_of_asset,assetDetails.receiver_wallet_address).send({from:assetDetails.sender_wallet_address,gas:estimatedGas},function(err,res){
                            if(err){                           
                                resolve({status:"error",payload:err.toString()});
                            }else{
                                resolve({status:"success",payload:res});
                            }
                        });
                    }
                })
                
            })
        }catch(err){
            resolve({status:"error",payload:err.toString()})
        }
    })
}

exports.setContractData = setContractData;


function getContractData(asset_details){
    let assetDetails = asset_details;
    return new Promise(function(resolve,reject){
        try{
            ContractObject.initiateContract(assetDetails).then(function(contract){
                let user_contract = contract;
                user_contract.methods.getAssetData().call(function(err,res){
                    if(err){                           
                        resolve({status:"error",payload:err.toString()});
                    }else{
                        let formattedResponse = {
                            "asset_name":res[0],
                            "type_of_asset":res[1],
                            "asset_sender_address":res[2],
                            "asset_receiver_address":res[3]
                        }
                        resolve({status:"success",payload:formattedResponse});
                    }
                })
            })
        }catch(err){
            resolve({status:"error",payload:err.toString()})
        }
    })
    
}

exports.getContractData = getContractData;


function transferOwner(asset_details){
    let assetDetails = asset_details;
    return new Promise(function(resolve,reject){
        try{
            ContractObject.initiateContract(assetDetails).then(function(contract){
                let user_contract = contract;
                user_contract.methods.transferOwnership(assetDetails.beneficiary_wallet_address).estimateGas(function(err,estimatedGas){
                    if(err){
                        resolve({status:"error",payload:err.toString()});
                    }else{
                        user_contract.methods.transferOwnership(assetDetails.beneficiary_wallet_address).send({from:assetDetails.sender_wallet_address,gas:estimatedGas},function(err,res){
                            if(err){                           
                                resolve({status:"error",payload:err.toString()});
                            }else{
                                resolve({status:"success",payload:res});
                            }
                        });
                    }
                })
                
            })
        }catch(err){
            resolve({status:"error",payload:err.toString()})
        }
    })
}

exports.transferOwner = transferOwner;