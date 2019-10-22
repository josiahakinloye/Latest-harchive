const blockchain = require('../../../_lib/modules/blockchain');
module.exports = {

    friendlyName: 'Asset Creation In Blockchain',
  
  
    description: 'Asset creation for a user.',
  
  
    extendedDescription: `This creates an aasset in blockchain.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Asset created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to create your asset.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (assetDetails) {

      await blockchain.createAssetContract(assetDetails);
        
    }
  
  };
  