// add a new field called asset_contract_address. DONE

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Mixed = Schema.Types.Mixed;

const userSchema = new Schema({
    // id: {type: ObjectId, unique: true},
    username: {type: String, unique: true},
    password: {type: String},
    email: {type: String},
    profile_picture: Mixed,
    email_verified:{
      status:{type: Boolean, default: false},
      verification_id:Number
    },
    last_time_login:{type: Date},
    device_mac_address:[],
    user_logout:{type: Boolean, default:false},
    account_deactivated:{type: Boolean, default: false},
    account_deleted: {type: Boolean, default: false},
    wallets:[{
      // id:{type: ObjectId, unique: true},
      wallet_address:String,
      wallet_private_key:String
    }],
    assets:[{
      // id:{type: ObjectId, unique: true},
      asset_name:String,
      beneficiary_name:String,
      previous_owner:String,
      sender_wallet_address:String,
      sender_private_key:String,
      receiver_wallet_address:String,
      asset_contract_address:String,
      asset_detail:[{
        type_of_asset:String,
        asset_attributes:Mixed
      }],
      asset_creation_date:Date,
      deadline:Date,
      description:String,
      others:String,
      asset_transfered:{type: Boolean, default: false},
      asset_deleted:{type: Boolean, default: false}
    }],
    friend_list:[{
      // id:{type: ObjectId, unique: true},      
      friend_username:String,
      friend_request_status:String,
      remove_friend:{type: Boolean, default: false}
    }]
});

module.exports = mongoose.model('user', userSchema);