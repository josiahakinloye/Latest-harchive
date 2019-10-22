const assets = require('../../../_lib/modules/assets');
module.exports = {

    friendlyName: 'Create real asset',
  
  
    description: 'Create real asset',
  
  
    extendedDescription: `This creates real asset.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Asset created locally successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to transfer owner data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (assetDetails) {
        // await asset.createRealAssets(assetDetails);
    }
  
  };
  