module.exports = {


    friendlyName: 'Transfer digital asset',
  
  
    description: 'Transfer digital asset',
  
  
    extendedDescription: `This transfers digital asset.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Asset transferd locally successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to transfer owner data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (inputs) {
      let { username, assetId } = inputs;
      // await asset.transferAsset(username,assetId);
    }
  
  };
  