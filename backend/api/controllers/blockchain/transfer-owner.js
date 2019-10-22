const blockchain = require('../../../_lib/modules/blockchain');
module.exports = {

    friendlyName: 'Transfer owner',
  
  
    description: 'Transfer owner',
  
  
    extendedDescription: `This transfers owner asset.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Asset owner transferred successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to transfer owner data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (assetDetails) {
        await blockchain.transferOwner(assetDetails);
    }
  
  };
  