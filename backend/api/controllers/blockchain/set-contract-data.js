const blockchain = require('../../../_lib/modules/blockchain');
module.exports = {

    friendlyName: 'Set Contract Data',
  
  
    description: 'Set contract data.',
  
  
    extendedDescription: `This sets  a wallet for the user.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Contract data set successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to set contract data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (assetDetails) {
        await blockchain.setContractData(assetDetails);
    }
  
  };
  