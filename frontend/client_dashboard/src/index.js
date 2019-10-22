import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './v1/App';

import store from '../src/v1/model/redux-store/store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faEdit, faPlusSquare, faSearch, faCartArrowDown, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../_assets/css/general.css";

// Load Font Awesome Icons
library.add(faCog, faEdit, faPlusSquare, faSearch, faCartArrowDown, faMoneyBill);

// Render application
if(document.getElementById('dashboard')) {
    ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('dashboard'));
}

