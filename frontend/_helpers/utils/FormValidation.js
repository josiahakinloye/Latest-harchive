/**
 * This is just a helper class. 
 * It is NOT a HOC, so you still have to handle any logic apart from form field check
 * To use, please ensure that your state has a formdata object
 * Compulsory in formdata are: submit_btn_disabled & form_err
 * Format for two values required in the state for each form field:
 * formFieldName, formFieldName_ok
 * 
 */
class FormValidation {    
    idex = /^13\-?[0-9]{6}\-?[A-Z]{2}$/;
    emex = /^[a-z0-9-_.]+@[a-z0-9-.]+\.[a-z]{2,}$/


    /**
     * Validate an email and set attributes
     * @param e for event source
     * @param c for class context
     */
    validateOnlineID(e, c){
        if(!c.state.formdata.submit_btn_disabled){
            if(e.target.value.toUpperCase().match(this.idex)){
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, banking_id: e.target.value, banking_id_ok: true, 
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,  
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled}
                })
            }else{
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, banking_id: e.target.value, banking_id_ok: false,
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,  
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled} 
                })
            }            
        }
    }
    /**
     * Validate an email and set attributes
     * @param e for event source
     * @param c for class context
     */
    validateEmail(e, c){
        if(!c.state.formdata.submit_btn_disabled){
            if(e.target.value.toLowerCase().match(this.emex)){
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, email: e.target.value, email_ok: true, 
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,  
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled}
                })
            }else{
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, email: e.target.value, email_ok: false,
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,  
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled} 
                })
            }            
        }
    }
    /**
     * Validate a Nigerian phone number and set attributes
     * @param e for event source
     * @param c for class context
     */
    validateNigerianPhone(e, c){
        if(!c.state.formdata.submit_btn_disabled){
            if(e.target.value.match(this.phonex)){
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, phone: e.target.value, phone_ok: true, 
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,  
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled}
                })
            }else{
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, phone: e.target.value, phone_ok: false,
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,  
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled} 
                })
            }            
        }
    }
    
    /**
     * Validate a password and set attributes
     * @param e for event source
     * @param c for class context
     */
    validatePassword(e, c){
        if(!c.state.formdata.submit_btn_disabled){
            if(e.target.value.length >= 4 ){
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, passw: e.target.value, passw_ok: true, 
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err, 
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled}
                })
            }else{
                c.setState({
                    ...c.state, formdata: {...c.state.formdata, passw: e.target.value, passw_ok: false, 
                    form_err: (e.key !== 'Enter') ? "" : c.state.formdata.form_err,   
                    submit_btn_disabled: (e.key !== 'Enter') ? false : c.state.formdata.submit_btn_disabled}             
                })
            }
        }
    }

    
    /**
     * Validate a name field
     * @param e for event source
     */
    validateNameField(e){ 
        return e.target.value.match(this.namex);
    }
}

export default FormValidation