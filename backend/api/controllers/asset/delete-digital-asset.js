module.exports = {


    friendlyName: 'Delete real asset',
  
  
    description: 'Delete real asset',
  
  
    extendedDescription: `This deletes real asset.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Asset deleted locally successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to transfer owner data.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function ({username, assetId}) {
        // await asset.deleteAsset(username,assetId);
    }
  
  };
  