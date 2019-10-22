module.exports = {


    friendlyName: 'Add User\'s Beneficiary',
  
  
    description: 'Add a beneficiary for user',
  
  
    extendedDescription: `This adds beneficiary for user.`,
  
  
    inputs: {
        
    },
  
  
    exits: {
  
      success: {
        description: 'Beneficiary added successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'Unable to add beneficiary.',
        extendedDescription: 'Please ensure that all the required data is being provided.'
      }
  
    },
  
  
    fn: async function (inputs) {
        
    }
  
  };
  