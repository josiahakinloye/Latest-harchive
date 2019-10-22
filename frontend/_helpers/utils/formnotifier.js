import React from 'react'


const FormNotifier = (props) => {
    return  <div className="form-notifier">
                <small className={props.statusclass}>
                    {props.children}
                </small>
            </div>
}

export default FormNotifier