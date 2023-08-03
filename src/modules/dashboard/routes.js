import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";
import DashboardContainer from "./containers/Dashboard";
import NewMasterHopDongListContainer from "./containers/Dashboard/NewMasterHopDongList";

const DashboardRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/search-information`} component={NewMasterHopDongListContainer} />
        <Route path={`${match.url}`} component={DashboardContainer} />
     
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(DashboardRouteComponent);