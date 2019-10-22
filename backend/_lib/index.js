//session management
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// express server setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const multer = require('multer');
var upload_profile_picture = multer({ dest: 'uploads/profile-picture'});
var upload_real_assets = multer({ dest: 'uploads/real-assets'});
// security package
const helmet = require('helmet')

// import from different files
const wallet = require('./modules/wallet');
const user = require('./modules/registration');
const uniqueUser = require('./modules/uniqueUsername');
const asset = require('./modules/assets');
const friend = require('./modules/friends');
const email = require('./modules/email');
const blockchain = require('./modules/blockchain');
const autoAssetTransfer = require('./modules/autoAssetTransfer');

// initialisaction of session management and session store. 
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/will-management-system-test',
    collection: 'users_sessions_test'
});
store.on('connected', function() {
    console.log('connected to session store');
    // console.log(store.client); // The underlying MongoClient object from the MongoDB driver
});
// Catch errors
store.on('error', function(error) {
    console.log('error while connecting to session store.');
});


// cors enable
app.use(cors());
// security
app.use(helmet());
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'will-management-system-key',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: false,
    saveUninitialized: false
}));


// ************* API CREATION ************ //
// app.get('/', function(req, res) {
//     // console.log(req);
//     console.log(req.session);
//     // res.send('Hello ' + JSON.stringify(req.session));
// });

//  REGISTRATION MODULE.
app.post('/checkUniqueUser',function(req,res){
    let username = req.body.username;
    let emailAddress = req.body.email;
    uniqueUser.checkUniqueness(username,emailAddress).then(function(response){
        if(response.status == "success"){
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error"});
        }
    })
});

app.post('/registerUser',upload_profile_picture.single('profile_picture'),(req,res) => {
    let userDetails = {
        image:req.file,
        other:req.body
    };
    user.createUser(userDetails).then(function(response){
        if(response.status == "success"){
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error",data:response.payload});
        }        
    });
})

app.get('/verifyEmailAddress',(req,res)=>{
    let user_id = req.query.id;    
    let user_email = req.query.email;       
    email.verifyEmailAddress(user_email,user_id).then(function(response){
        if(response.status == "success"){
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error",data:response.payload});
        }    
    });
})

app.get('/addNewDevice',(req,res)=>{
    let user = req.query.username;    
    let user_mac_address = req.query.mac_address;    
    
    email.addNewDevice(user,user_mac_address).then(function(response){
        if(response.status == "success"){
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error",data:response.payload});
        }    
    });
})

app.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let macAddress = req.body.mac_address;                
    user.userLogin(username,password,macAddress).then(function(response){
        if(response.status == "success"){
            // if(Object.prototype.hasOwnProperty.call(req.session,'users')){
            //     req.session.users.push({username:username});                
            // }else{
            //     req.session.users = [];
            //     req.session.users.push({username:username});                
            // }
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error",data:response.payload});
        }    
    });
})

app.post('/logout',(req,res)=>{
    let username = req.body.username;    
    user.checkAccountStatus(user).then(function(account_status_response){
        if(account_status_response.status == "success"){
            user.userLogout(username).then(function(response){
                if(response.status == "success"){            
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }    
            });
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })        
})

// get user profile can be used multiple ways so no need to check for login and etc.
app.post('/getUserProfile',(req,res)=>{
    let username = req.body.username;
    user.getUserProfile(username).then(function(response){
        if(response.status == "success"){
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error",data:response.payload});
        }
    })
})

app.post('/updateUserProfile',upload_profile_picture.single('profile_picture'),(req,res)=>{    
    let userDetails = {
        image:req.file,
        other:req.body
    };

    user.checkAccountStatus(userDetails.other.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            user.updateProfile(userDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })  

    
})

app.post('/deleteAccount',(req,res)=>{
    let username = req.body.username;
    let accountStatus = req.body.accountStatus;

    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            user.deleteAccount(username,accountStatus).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })      
})

// WALLET MODULE. 
app.post('/createWallet',function(req,res){
    let username = req.body.username;
    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            wallet.createWallet(username).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error"});
                }
            });
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })        
});

// BLOCKCHAIN MODULE
app.post('/getEtherBalance',function(req,res){
    let username = req.body.username;
    let walletAddress = req.body.wallet_address;
    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            blockchain.getEtherBalance(username,walletAddress).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })     
})

app.post('/createAssetInBlockchain',(req,res)=>{
    let assetDetails = req.body;

    user.checkAccountStatus(assetDetails.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            blockchain.createAssetContract(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })     
    
})

app.post('/setContractData',(req,res)=>{
    let assetDetails = req.body;
    user.checkAccountStatus(assetDetails.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            blockchain.setContractData(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    }) 
})

app.post('/getContractData',(req,res)=>{
    let assetDetails = req.body;

    user.checkAccountStatus(assetDetails.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            blockchain.getContractData(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })     
})

app.post('/transferOwner',(req,res)=>{
    let assetDetails = req.body;
    user.checkAccountStatus(assetDetails.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            blockchain.transferOwner(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })    
})

// ASSET MODULE.
app.get('/autoAssetTransfer',(req,res)=>{
    autoAssetTransfer.transfer().then(function(response){
        if(response.status == "success"){
            res.status(200).send({status: "success",data:response.payload});
        }else{
            res.status(200).send({status: "error",data:response.payload});
        }  
    })
})

app.post('/createRealAsset',upload_real_assets.array('asset_images'),(req,res)=>{
    let assetDetails = {
        asset_images:req.files,
        other_form_fields:req.body
    };

    user.checkAccountStatus(assetDetails.other_form_fields.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.createRealAssets(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })      
})

app.post('/updateRealAsset',upload_real_assets.array('asset_images'),(req,res)=>{    
    let assetDetails = {
        asset_images:req.files,
        other_form_fields:req.body
    };

    user.checkAccountStatus(assetDetails.other_form_fields.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.updateRealAsset(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })    
})

app.post('/createDigitalAsset',(req,res)=>{
    let assetDetails = req.body;

    user.checkAccountStatus(assetDetails.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.createDigitalAsset(assetDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }   
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })      
})

app.post('/updateDigitalAsset',(req,res)=>{
    let assetObject = req.body;

    user.checkAccountStatus(assetObject.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.updateDigitalAsset(assetObject).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })    
})


app.post('/deleteAsset',(req,res)=>{
    let username = req.body.username;
    let assetId = req.body.assetId;

    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.deleteAsset(username,assetId).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })    
})

app.post('/transferAsset',(req,res)=>{
    let username = req.body.username;
    let assetId = req.body.asset_id;

    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.transferAsset(username,assetId).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })       
})

app.post('/addBeneficiary',(req,res)=>{
    let beneficiaryDetails = req.body;    
    user.checkAccountStatus(beneficiaryDetails.username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            asset.addBeneficiary(beneficiaryDetails).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    }) 
    
})

// beneficiary or friend request module
app.post('/addFriend',(req,res)=>{
    let username = req.body.username;
    let friends_username = req.body.friend_username;
    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            friend.addFriend(username,friends_username).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    })     
})

app.post('/acceptFriendRequest',(req,res)=>{
    let username = req.body.username;
    let friends_username = req.body.friend_username;

    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            friend.acceptFriendRequest(username,friends_username).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    }) 
})

app.post('/removeFriend',(req,res)=>{
    let username = req.body.username;
    let friends_username = req.body.friend_username;    

    user.checkAccountStatus(username).then(function(account_status_response){
        if(account_status_response.status == "success"){
            friend.removeFriend(username,friends_username).then(function(response){
                if(response.status == "success"){
                    res.status(200).send({status: "success",data:response.payload});
                }else{
                    res.status(200).send({status: "error",data:response.payload});
                }     
            })
        }else{
            res.status(200).send({status: "error",data:account_status_response.payload});
        }
    }) 
})


app.listen(9000,function(){
    console.log("connection to server successfull");
});
