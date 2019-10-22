const UserManager = artifacts.require("UserManager.sol");
const AssetManager = artifacts.require("AssetManager.sol");

contract("AssetManager", accounts => {
    let assetInstance, assetCount = 0;
    const [master_owner, user, assetReceiver] = accounts;

    const asset_type = { property: 0, money: 1 }

    before(async () => {
        const userInstance = await UserManager.deployed();
        try {
            await userInstance.addUser(user, { from: master_owner });
            await userInstance.addUser(assetReceiver, { from: master_owner });
        } catch (e) { }
        assetInstance = await AssetManager.deployed();
    });

    it("should add an asset to our list of assets if requester is a user", async () => {
        try {
            // Add new user
            await assetInstance.createAsset("shoe", asset_type.property, `${new Date().getMilliseconds()}`, { from: user });
            // Get asset count
            assetCount = await assetInstance.assetCount.call();
        } catch (e) { }
        
        assert.notEqual(assetCount, 0, "The new asset was not created");
    });

    it("should not add an asset to our list of assets if requester is not user", async () => {
        const lastAssetCount = assetCount;
        try {
            // Add new user
            await assetInstance.createAsset("shoe", asset_type.property, `${new Date().getMilliseconds()}`, { from: master_owner });
            // Get asset count
            assetCount = await assetInstance.assetCount.call();
        } catch (e) { }

        assert.equal(lastAssetCount, assetCount, "The new asset was created");
    });

    it("should get created asset", async () => {
        let asset, aid = assetCount;
        try {
            // Get created asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.equal(asset['0'], "shoe", "The previously created asset was gotten");
    });

    it("should lock asset if owner is calling", async () => {
        let asset, aid = assetCount;
        try {
            // lock asset
            await assetInstance.lockAsset(aid, { from: user });
            // get asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.equal(asset, undefined, "The asset wasn't locked");
    });

    it("should not unlock asset if not owner is calling", async () => {
        let asset, aid = assetCount;
        try {
            // unlock asset
            await assetInstance.unlockAsset(aid, { from: master_owner });
            // get asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.equal(asset, undefined, "The asset was unlocked");
    });

    it("should unlock asset if owner is calling", async () => {
        let asset, aid = assetCount;
        try {
            // unlock asset
            await assetInstance.unlockAsset(aid, { from: user });
            // get asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.equal(asset['0'], "shoe", "The asset wasn't unlocked");
    });

    it("should not lock asset if not owner is calling", async () => {
        let asset, aid = assetCount;
        try {
            // unlock asset
            await assetInstance.lockAsset(aid, { from: user });
            // get asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.equal(asset, undefined, "The asset was locked");
    });

    it("should not lock asset if not valid asset", async () => {
        let asset, aid = assetCount;
        try {
            // unlock asset
            await assetInstance.lockAsset(aid + 1, { from: user });
            // get asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.equal(asset, undefined, "The asset was locked");
    });

    it("should transfer asset from one user to another", async () => {
        let asset, aid = assetCount;
        try {
            // transfer asset
            await assetInstance.transferAsset(aid, assetReceiver, { from: user });
            // recieve asset
            await assetInstance.acceptTransferredAsset(aid, { from: assetReceiver });
            // get asset
            asset = await assetInstance.getAsset.call(aid);
        } catch (e) { }

        assert.notEqual(asset, undefined, "The asset was not transferred");

        assert.equal(asset['1'], assetReceiver, "The asset was not received");
    });
});