const assets = require('../../../_lib/modules/assets');
module.exports = {

    friendlyName: 'Auto transfer asset',
  
  
    description: 'Transfer asset auto',
  
  
    extendedDescription: `This transfers owner on auto.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Auto asset transfer successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to transfer owner data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (inputs) {
        // await autoAssetTransfer.transfer();
    }
  
  };
  