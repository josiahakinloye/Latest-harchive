const mongoose = require('mongoose');
const user = require('./schema');
// let db;
var Web3 = require('web3');
var web3 = new Web3('https://ropsten.infura.io/bIAFH6ZgTmvudTPcotKE');

function createWallet(username){
    let requestedUser = username;

    return new Promise(function(resolve,reject){
        try{
          mongoose.connect('mongodb://localhost:27017/will-management-system-test',{ useNewUrlParser: true });
          let db = mongoose.connection;
          db.once('open', function() {
            user.find({username:requestedUser},function(err,users){
              if(err){
                resolve({status:"error",payload:"error while retrieving user info"});
              }else{                        
                if(users.length == 1){                                        
                    let newAccount = web3.eth.accounts.create();
                    users[0].wallets.push({wallet_address:newAccount.address,wallet_private_key:newAccount.privateKey});                                        
                    users[0].save().then(item => {
                        resolve({status:"success",payload:{wallet_address:newAccount.address,wallet_private_key:newAccount.privateKey}});
                    })
                    .catch(err => {
                        resolve({status:"error",payload:"unable to create wallet"});
                    });
                }else{
                  resolve({status:"error",payload:"Something went wrong.Please try again later.If require Contact Administrator"});
                }            
              }
            })        
          });
        }catch(err){
          resolve({status:"error",payload:err.toString()});
        }
    })   
}

exports.createWallet = createWallet;
