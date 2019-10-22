const assets = require('../../../_lib/modules/assets');
module.exports = {

    friendlyName: 'Update digital asset',
  
  
    description: 'Update digital asset',
  
  
    extendedDescription: `This updates digital asset.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Asset updated locally successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to transfer owner data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (assetDetails) {
      // await asset.transferAsset(username,assetId);
    }
  
  };
  