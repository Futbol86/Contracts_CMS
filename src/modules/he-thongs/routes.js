import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated, UserIsAdmin, UserIsPermissionModules} from "../../routes";

import AccountListContainer  from './containers/AccountList';
import AccountAddContainer   from './containers/AccountAdd';
import AccountEditContainer  from './containers/AccountEdit';

import UserGroupListContainer  from './containers/UserGroupList';
import UserGroupAddContainer   from './containers/UserGroupAdd';
import UserGroupEditContainer  from './containers/UserGroupEdit';

import UserLogListContainer  from './containers/UserLogList';

import PrintSearchTicketListContainer  from './containers/PrintSearchTicketList';

import PermissionListContainer  from './containers/PermissionList';
// import PermissionAddContainer   from './containers/PermissionAdd';
// import PermissionEditContainer  from './containers/PermissionEdit';

import SystemConfigContainer from './containers/SystemConfig';

const AccountsRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/accounts/list`} component={AccountListContainer} />
        <Route path={`${match.url}/accounts/add`} component={AccountAddContainer} />
        <Route path={`${match.url}/accounts/edit/:id`} component={AccountEditContainer} />

        <Route path={`${match.url}/user-groups/list`} component={UserGroupListContainer} />
        <Route path={`${match.url}/user-groups/add`} component={UserGroupAddContainer} />
        <Route path={`${match.url}/user-groups/edit/:id`} component={UserGroupEditContainer} />

        <Route path={`${match.url}/user-logs/list`} component={UserLogListContainer} />
  
        <Route path={`${match.url}/print-search-tickets/list`} component={PrintSearchTicketListContainer} />

        <Route path={`${match.url}/permissions/list`} component={PermissionListContainer} />
        {/* <Route path={`${match.url}/permissions/add`} component={PermissionAddContainer} />
        <Route path={`${match.url}/permissions/edit/:id`} component={PermissionEditContainer} /> */}

        <Route path={`${match.url}/system-configs`} component={SystemConfigContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(AccountsRouteComponent);