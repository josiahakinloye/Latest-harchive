const UserManager = artifacts.require("UserManager.sol");

contract("UserManager", accounts => {
  let instance;
  const [master_owner, user, assetReceiver] = accounts;

  before(async () => {
    instance = await UserManager.deployed();
  });

  it("should add a user to our list of users if master owner is calling", async () => {
    // Add new user
    await instance.addUser(user, { from: master_owner });

    // Get user
    const assetUser = await instance.isUser.call(user);

    // run test
    assert.equal(assetUser, true, "The new user was not created");
  });

  it("should not add a user to our list of users if not master owner is calling", async () => {
    let assetUser;
    try{
      // Add new user
      await instance.addUser(assetReceiver, { from: user });
  
      // Get user
      assetUser = await instance.isUser.call(assetReceiver);

    } catch (e) {}

    // run test
    assert.equal(assetUser, undefined, "The new user was created");
  });
});