import React from 'react';
import { connect } from 'react-redux';
import Layout from './layout';
import { withRouter, Route, Switch } from 'react-router';
import { routes } from './routes/routes';
import Overview from './views/overview';
import { userdashboardurl } from '../../../_helpers/constants';
import Blocked from './views/blocked';
import TransferAssets from './views/transfer_assets';
import Friends from './views/friends';
import ManageBeneficiaries from './views/manage_beneficiaries';
import Settings from './views/settings';

const determineRoutePage = (path) => {
    for (let id in routes) {
        if (routes[id].match(path) !== null) {
            return { id: id, url: routes[id] };
        }
    }
    return { id: "overview", url: routes.overview };
}

const Dashboard = ({ location }) => {
    return (
        <>
            <Layout page={determineRoutePage(location.pathname)}>
                <Switch>
                    <Route exact path={routes.overview} component={Overview} />
                    <Route exact path={routes.transfer_assets} component={TransferAssets} />
                    <Route exact path={routes.friends} component={Friends} />
                    <Route exact path={routes.manage_beneficiaries} component={ManageBeneficiaries} />
                    <Route exact path={routes.settings} component={Settings} />
                    <Route path={userdashboardurl} component={Blocked} />
                </Switch>
            </Layout>
        </>
    )
}

export default withRouter(connect(({ appinit }) => ({ appinit }), null)(Dashboard));