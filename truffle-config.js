const path = require("path");


const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "#";

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_directory: path.join(__dirname, "smart_contracts"),
  contracts_build_directory: path.join(__dirname, "abi"),
  migrations_directory: path.join(__dirname, "smart_contracts_migrations"),
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,  
      gas: 5500000,       
    },
  }
};