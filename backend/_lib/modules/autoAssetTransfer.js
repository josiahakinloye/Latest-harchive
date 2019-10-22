// const mongoose = require('mongoose');
const user = require('./schema');
var Web3 = require('web3');
var web3 = new Web3('https://ropsten.infura.io/bIAFH6ZgTmvudTPcotKE');
const blockchain = require('./blockchain');
const asset = require('./assets');

function transfer(){
    try{
        mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
        let db = mongoose.connection;  
        db.once('open', function(){
            user.find({},function(err,users){
                users.forEach((eachUser,userIndex)=>{
                    let currentDate = new Date();
                    eachUser.assets.forEach((singleAsset,assetIndex)=>{                        
                        if(singleAsset.deadline <= currentDate){                            
                            let assetObject = {                                
                                "sender_wallet_address":singleAsset.sender_wallet_address,
                                "sender_private_key":singleAsset.sender_private_key,
                                "contract_address":singleAsset.asset_contract_address,
                                "beneficiary_wallet_address":singleAsset.receiver_wallet_address,
                                "gas_price":50,
                                "total_gas_ammount":1000000
                            }

                            blockchain.transferOwner(assetObject).then(function(response){
                                if(response.status == "success"){
                                    asset.transferAsset(eachUser.username,singleAsset._id).then(function(response){
                                        if(response.status == "success"){
                                            console.log("asset is transfered");
                                        }
                                    })
                                }   
                            })
                        }
                    })
                })
            })
        })
    }catch(err){
        console.log(err);
    }
}

exports.transfer = transfer;