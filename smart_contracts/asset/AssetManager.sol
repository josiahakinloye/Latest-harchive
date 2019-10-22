pragma solidity ^0.5.0;
import { Owned } from '../user/Owned.sol';
import { EmitsEvent } from '../_event/EmitsEvent.sol';
import { AssetStore } from '../_lib/AssetStore.sol';
import { UserManager } from '../user/UserManager.sol';

/**
 * @title AssetManager
 * @dev contract that holds and performs CRUD operation on assets
 */
contract AssetManager is Owned, EmitsEvent 
{
    //Track Users
    UserManager um;

    // track asset count and use as id
    uint public assetCount;

    // All the assets under our control
    mapping(uint => AssetStore.Asset) assets;

    // Map id of assets currently in transfer to receiver
    mapping(uint => address) assetsInTransfer;

    // ensure that caller owns asset
    modifier isAssetOwner(uint assetId) {
        require (msg.sender == assets[assetId].owner, 
            "You must be an asset owner to access this function"); _;
    }

    // ensure that the caller is a user
    modifier isUser(address _u) {
        require (um.isUser(_u), "You must be a user to access this function"); _;
    }

    // ensure that asset exists
    modifier isValidAsset(uint assetId) {
        require (assets[assetId].valid, "This asset doesn't exist"); _;
    }

    // ensure that the asset transfer request actually exists
    modifier isValidTransfer(uint assetId) {
        require (uint(assetsInTransfer[assetId]) != 0, "This asset was never in transfer mode"); _;
    }

    constructor(address _um) public {
        um = UserManager(_um);
    }

    /**
     * @dev allow users to create assets
     * @param _name - name of asset
     * @param _kind - type of asset
     */
    function createAsset(string memory _name, uint8 _kind, string memory created) public 
        isUser(msg.sender) returns (uint newIndex)
    {
        // get the next index for the assets store
        newIndex = ++assetCount;
        // store the asset
        assets[newIndex] = AssetStore.Asset(msg.sender, _name, _kind, true, false, created);
        emitActionSuccess("asset-creation-success: asset created successfully");
    }

    /**
     * Get asset by id
     * @param _aid - any asset id
     */
    function getAsset(uint _aid) view public 
        returns (string memory _name, address _owner, uint8 _kind, string memory _date_created)
    {
        // throw error if asset is currently locked
        require(!assets[_aid].locked, "You can not see a locked asset");

        // return the values
        _name = assets[_aid].name;
        _owner = assets[_aid].owner;
        _kind = assets[_aid].kind;
        _date_created = assets[_aid].date_created;
    }

    /**
     * @dev lock asset to prevent it from being accessible
     * @param _aid - any asset id
     */
    function lockAsset(uint _aid) public isAssetOwner(_aid) isValidAsset(_aid)
    {
        assets[_aid].locked = true;
        emitActionSuccess("asset-lock-success: asset locked successfully");
    }

    /**
     * @dev lock asset to prevent it from being accessible
     * @param _aid - any asset id
     */
    function unlockAsset(uint _aid) public isAssetOwner(_aid) isValidAsset(_aid)
    {
        assets[_aid].locked = false;
        emitActionSuccess("asset-lock-success: asset unlocked successfully");
    }

    /**
     * @dev lock asset to prevent it from being accessible
     * @param _aid - any asset id
     * @param _receiver - any valid ethereum address
     */
    function transferAsset(uint _aid, address _receiver) public isAssetOwner(_aid)
        isValidAsset(_aid) isUser(_receiver)
    {
        // lock asset first
        lockAsset(_aid);
        // add asset to list of assets in transfer
        assetsInTransfer[_aid] = _receiver;
        emitActionSuccess("asset-set-in-transfer-success: asset set in transfer successfully");
    }

    /**
     * @dev allow receiver to receive asset
     * @param _aid - any asset id
     */
    function acceptTransferredAsset(uint _aid) public isValidTransfer(_aid)
    {
        // confirm that the person accepting was the person set to receive it
        require(msg.sender == assetsInTransfer[_aid], "Only the receiver can accept the asset");
        // receive the asset
        assets[_aid].owner = assetsInTransfer[_aid];
        unlockAsset(_aid);
        emitActionSuccess("asset-transfer-success: asset transferred successfully");
    }

    /**
     * @dev kill this contract if something has gone wrong
     */
    function kill() public onlyMasterOwner() {
        selfdestruct(master_owner);
    }

}