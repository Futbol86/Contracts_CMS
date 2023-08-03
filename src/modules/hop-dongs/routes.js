import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import HopDongListContainer  from './containers/HopDongList';
import HopDongAddContainer   from './containers/HopDongAdd';
import HopDongEditContainer  from './containers/HopDongEdit';
import HopDongViewContainer  from './containers/HopDongView';

import NganChanListContainer  from './containers/NganChanList';
import NganChanAddContainer   from './containers/NganChanAdd';
import NganChanEditContainer  from './containers/NganChanEdit';

import GiaiToaListContainer  from './containers/GiaiToaList';
import GiaiToaAddContainer   from './containers/GiaiToaAdd';
import GiaiToaEditContainer  from './containers/GiaiToaEdit';

import NewHopDongListContainer  from './containers/NewHopDongList';
import NewHopDongAddContainer   from './containers/NewHopDongAdd';
import NewHopDongEditContainer  from './containers/NewHopDongEdit';

import ThuHoiGCNListContainer  from './containers/ThuHoiGCNList';
import ThuHoiGCNAddContainer   from './containers/ThuHoiGCNAdd';
import ThuHoiGCNEditContainer  from './containers/ThuHoiGCNEdit';

import NewDongAHopDongListContainer  from './containers/NewDongAHopDongList';

const HopDongsRouteComponent = ({ match }) => (
    <Switch>
        {/* <Route path={`${match.url}/contract/list`} component={HopDongListContainer} />
        <Route path={`${match.url}/contract/add`} component={HopDongAddContainer} />
        <Route path={`${match.url}/contract/edit/:id`} component={HopDongEditContainer} />
        <Route path={`${match.url}/contract/view/:id`} component={HopDongViewContainer} /> */}

        <Route path={`${match.url}/asset-preventions/list`} component={NganChanListContainer} />
        <Route path={`${match.url}/asset-preventions/add`} component={NganChanAddContainer} />
        <Route path={`${match.url}/asset-preventions/edit/:id`} component={NganChanEditContainer} />

        <Route path={`${match.url}/asset-releases/list`} component={GiaiToaListContainer} />
        <Route path={`${match.url}/asset-releases/add`} component={GiaiToaAddContainer} />
        <Route path={`${match.url}/asset-releases/edit/:id`} component={GiaiToaEditContainer} />

        <Route path={`${match.url}/new-contract/list`} component={NewHopDongListContainer} />
        <Route path={`${match.url}/new-contract/add`} component={NewHopDongAddContainer} />
        <Route path={`${match.url}/new-contract/edit/:id`} component={NewHopDongEditContainer} />

        <Route path={`${match.url}/thu-hoi-gcns/list`} component={ThuHoiGCNListContainer} />
        <Route path={`${match.url}/thu-hoi-gcns/add`} component={ThuHoiGCNAddContainer} />
        <Route path={`${match.url}/thu-hoi-gcns/edit/:id`} component={ThuHoiGCNEditContainer} />

        <Route path={`${match.url}/contract-histories/list`} component={NewDongAHopDongListContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(HopDongsRouteComponent);