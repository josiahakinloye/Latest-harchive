## About
Asset managmenet dApp that is powered by the blockchain

## Usage
To build and use application locally,

Run a devlopment server from terminal like: `ganache-cli`

Then run these commands in order,
`truffle compile`

`truffle migrate`

`cd client`

`npm start`

To run smart contract tests: `truffle test`

If you plan to deploy app again to rinkeby testnet, 

first create a valid 12-phrase mnemonic and store in a `.secret` file locally,
 
Then run these commands in order, 

`npm install truffle-hdwallet-provider`

`truffle migrate --network rinkeby`

**Requirements:**

You can visit this dApp in your browser after running `npm start` or `sails lift --prod` by visiting [localhost:1337](http://localhost:1337).

You should have MetaMask or Mist installed in your browser to allow seamless provisioning of dApp.

## Project Structure

## License
MIT