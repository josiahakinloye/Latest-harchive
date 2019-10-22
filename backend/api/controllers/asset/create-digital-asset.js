const assets = require('../../../_lib/modules/assets');
module.exports = {

    friendlyName: 'Create digital asset',
  
  
    description: 'Create digital asset',
  
  
    extendedDescription: `This creates digital asset.`,
  
  
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
  
  
    fn: async function (inputs) {
        // await asset.createDigitalAsset(assetDetails);
    }
  
  };
  