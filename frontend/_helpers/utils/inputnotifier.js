import React from 'react'

const inputnotifier = (props) => {
    return  <div className="input-notifier">
                <small className={props.statusclass}>
                    {props.children}
                </small>
            </div>
}

export default inputnotifier