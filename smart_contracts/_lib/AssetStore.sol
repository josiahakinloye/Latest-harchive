pragma solidity ^0.5.0;

/**
 * @title AssetStore
 * @dev This library holds Asset structure and performs heavy ops
 */
library AssetStore {
    struct Asset {
        address owner;
        string name;
        uint8 kind;
        bool valid;
        bool locked;
        string date_created;
    }
}
