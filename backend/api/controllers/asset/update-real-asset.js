module.exports = {


    friendlyName: 'Update real asset',
  
  
    description: 'Update real asset',
  
  
    extendedDescription: `This updates real asset.`,
  
  
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
  
  
    fn: async function (inputs) {
        
    }
  
  };
  