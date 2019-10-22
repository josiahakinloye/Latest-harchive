import React from 'react';
import { Route } from 'react-router';
import Menu from './Menu';
import { routesTitles, routesIcons } from '../routes/routes';
import { userdashboardurl } from '../../../../_helpers/constants';
import './_css/layout.css';

const Layout = ({ page, children }) => (
    <div className="dashboard-main">
        {/* <div className="wrapper restricted">
                <h6><strong>*** You are viewing a restricted account. Please visit your branch to find out more. ***</strong></h6>
            </div> */}
        <div className="wrapper row">
            <div className="menu-box col-md-4 form-group">
                <Route path={userdashboardurl}>
                    <Menu page={page.url} />
                </Route>
            </div>
            <div className="page-box col-md-8 form-group">
                <div className="page-title mb-3">
                    <h5 className="title">
                        <i className={`material-icons${page.id === "transfer_funds" ? " flip-horizontal" : ""}`}>
                            {routesIcons[page.id]}
                        </i>
                        <span>{routesTitles[page.id]}</span>
                    </h5>
                </div>
                {children}
            </div>
        </div>
    </div>
);

export default Layout;