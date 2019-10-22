pragma solidity ^0.5.0;

contract Owned {
    address payable public master_owner;

    constructor() public {
        master_owner = msg.sender;
    }

    modifier onlyMasterOwner {
        require(msg.sender == master_owner); _;
    }
}