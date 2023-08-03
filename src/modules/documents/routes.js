import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

const DocumentsRouteComponent = ({ match }) => (
    <Switch>
        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(DocumentsRouteComponent);