const blockchain = require('../../../_lib/modules/blockchain');
module.exports = {

    friendlyName: 'Get Ether Balance',
  
  
    description: 'Balance for a new user account.',
  
  
    extendedDescription: `This gets ether balance.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Ether balance fetched successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to get your wallet\'s ether balance.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (inputs) {
      const {username,walletAddress} = inputs;

      await blockchain.getEtherBalance(username,walletAddress);
        
    }
  
  };
  