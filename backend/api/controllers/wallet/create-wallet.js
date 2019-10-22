const wallet = require('../../../_lib/modules/wallet');
module.exports = {


    friendlyName: 'Wallet Creation',
  
  
    description: 'Wallet for a new user account.',
  
  
    extendedDescription: `This creates a wallet for the user.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Wallet created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to create your wallet.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (inputs) {
        const { username } = inputs;

        await wallet.createWallet(username);
    }
  
  };
  