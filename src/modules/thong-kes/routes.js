import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import RequestTNMTLandDataReportListContainer  from './containers/RequestTNMTLandDataReportList';
import LandDataOfTNMTReportListContainer  from './containers/LandDataOfTNMTReportList';
import ArchiveBookReportListContainer  from './containers/ArchiveBookReportList';

const ThongKesRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/request-tnmt-land-data-reports/list`} component={RequestTNMTLandDataReportListContainer} />
        <Route path={`${match.url}/request-land-data-of-tnmt-reports/list`} component={LandDataOfTNMTReportListContainer} />
        <Route path={`${match.url}/archive-book-reports/list`} component={ArchiveBookReportListContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(ThongKesRouteComponent);