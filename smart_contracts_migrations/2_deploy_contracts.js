var UserManager = artifacts.require("UserManager.sol");
var AssetManager = artifacts.require("AssetManager.sol");

module.exports = function(deployer) {
  return (
    async function () {
      await deployer.deploy(UserManager);
      await deployer.deploy(AssetManager, UserManager.address);
    }
  )();
};
