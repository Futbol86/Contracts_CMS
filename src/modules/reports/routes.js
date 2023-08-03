import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import BieuMau31ReportListContainer  from './containers/BieuMau31ReportList';

const ReportsRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/sample-31/list`} component={BieuMau31ReportListContainer} />
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(ReportsRouteComponent);