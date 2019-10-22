const blockchain = require('../../../_lib/modules/blockchain');
module.exports = {

    friendlyName: 'Get Contract Data',
  
  
    description: 'Contract data from the etherum blockchain.',
  
  
    extendedDescription: `This gets contract data.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Contract data fetched successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to get your contract data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (assetDetails) {
        await blockchain.getContractData(assetDetails);
    }
  
  };
  