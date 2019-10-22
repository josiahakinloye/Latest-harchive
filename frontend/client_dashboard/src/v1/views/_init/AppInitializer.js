import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userdatafetchurl } from '../../../../../helpers/constants';
import { setClientData } from '../../../../../redux/actions/client';
import { setAppInit } from '../../../../../redux/actions/appinit';

class AppInitializer extends Component {
    state = { failed: false, failure_reason: "" }
    componentDidMount() {
        const { client_id } = this.props;
        axios.get(userdatafetchurl + "/" + client_id)
            .then(response => {
                this.handleLoginResponse(response)
            })
            .catch(error => {
                this.setState({ failed: true, failure_reason: error.message })
            });
    }

    handleLoginResponse({ data }) {
        if (data.status === 'failed') {
            this.setState({ failed: true, failure_reason: data.reason })
        } else if (data.status === 'success') {
            this.props.setClientData(data.data)
            this.props.setAppInit(true)
        }
    }

    render() {
        const { failed, failure_reason } = this.state;
        return (
            <div className="container">
                <div className="col-md-12 text-center">
                    {!failed ?
                        <>
                            <img className="btn-loader" src="/static/images/ajax-loader.gif" alt="..." />
                            <br />
                        </>
                        : <h5>
                            <strong>{failure_reason}</strong>
                            <Link to="/">
                                <p onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('client_id');
                                    window.location.reload();
                                }}>Reload</p>
                            </Link>
                        </h5>
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setClientData: data => dispatch(setClientData(data)),
    setAppInit: value => dispatch(setAppInit(value))
})

export default connect(({ client }) => ({ client_id: client.banking_id }), mapDispatchToProps)(AppInitializer);