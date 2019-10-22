pragma solidity ^0.5.0;
import { Owned } from './Owned.sol';
import { EmitsEvent } from '../_event/EmitsEvent.sol';

contract UserManager is Owned, EmitsEvent
{
    // all users on the platform
    mapping (address => bool) users;

    constructor() public {}

    /**
     * @dev Add users to the store
     * @param _user - any valid ethereum address
     */
    function addUser(address _user) public onlyMasterOwner returns (bool exists)
    {
        users[_user] = true;
        emitActionSuccess("user-manager: User added successfully");
        exists = true;
    }

    /**
     * @dev confirm that user exists
     * @param _user - any ethereum address
     */
    function isUser(address _user) view public returns (bool exists)
    {
        exists = users[_user];
    }
}