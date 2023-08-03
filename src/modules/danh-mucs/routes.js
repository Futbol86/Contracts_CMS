import React from 'react';
import {Route, Switch} from 'react-router';

import NotFound from "../../components/common/NotFound";
import {UserIsAuthenticated} from "../../routes";

import DoiTuongListContainer  from './containers/DoiTuongList';
import DoiTuongAddContainer   from './containers/DoiTuongAdd';
import DoiTuongEditContainer  from './containers/DoiTuongEdit';

import TaiSanListContainer  from './containers/TaiSanList';
import TaiSanAddContainer   from './containers/TaiSanAdd';
import TaiSanEditContainer  from './containers/TaiSanEdit';

import LoaiHopDongListContainer  from './containers/LoaiHopDongList';
import LoaiHopDongAddContainer   from './containers/LoaiHopDongAdd';
import LoaiHopDongEditContainer  from './containers/LoaiHopDongEdit';

import SubAssetTypeListContainer  from './containers/SubAssetTypeList';
import SubAssetTypeAddContainer   from './containers/SubAssetTypeAdd';
import SubAssetTypeEditContainer  from './containers/SubAssetTypeEdit';

import LoaiSoLuuTruListContainer  from './containers/LoaiSoLuuTruList';
import LoaiSoLuuTruAddContainer   from './containers/LoaiSoLuuTruAdd';
import LoaiSoLuuTruEditContainer  from './containers/LoaiSoLuuTruEdit';

import SoLuuTruListContainer  from './containers/SoLuuTruList';
import SoLuuTruAddContainer   from './containers/SoLuuTruAdd';
import SoLuuTruEditContainer  from './containers/SoLuuTruEdit';

import LandPurposeListContainer  from './containers/LandPurposeList';
import LandPurposeAddContainer   from './containers/LandPurposeAdd';
import LandPurposeEditContainer  from './containers/LandPurposeEdit';

const ContructionsRouteComponent = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/owner/list`} component={DoiTuongListContainer} />
        <Route path={`${match.url}/owner/add`} component={DoiTuongAddContainer} />
        <Route path={`${match.url}/owner/edit/:id`} component={DoiTuongEditContainer} />

        <Route path={`${match.url}/asset/list`} component={TaiSanListContainer} />
        <Route path={`${match.url}/asset/add`} component={TaiSanAddContainer} />
        <Route path={`${match.url}/asset/edit/:id`} component={TaiSanEditContainer} />

        <Route path={`${match.url}/sub-contract-type/list`} component={LoaiHopDongListContainer} />
        <Route path={`${match.url}/sub-contract-type/add`} component={LoaiHopDongAddContainer} />
        <Route path={`${match.url}/sub-contract-type/edit/:id`} component={LoaiHopDongEditContainer} />

        <Route path={`${match.url}/sub-asset-type/list`} component={SubAssetTypeListContainer} />
        <Route path={`${match.url}/sub-asset-type/add`} component={SubAssetTypeAddContainer} />
        <Route path={`${match.url}/sub-asset-type/edit/:id`} component={SubAssetTypeEditContainer} />

        <Route path={`${match.url}/archive-book-type/list`} component={LoaiSoLuuTruListContainer} />
        <Route path={`${match.url}/archive-book-type/add`} component={LoaiSoLuuTruAddContainer} />
        <Route path={`${match.url}/archive-book-type/edit/:id`} component={LoaiSoLuuTruEditContainer} />

        <Route path={`${match.url}/archive-book/list`} component={SoLuuTruListContainer} />
        <Route path={`${match.url}/archive-book/add`} component={SoLuuTruAddContainer} />
        <Route path={`${match.url}/archive-book/edit/:id`} component={SoLuuTruEditContainer} />

        <Route path={`${match.url}/land-purpose/list`} component={LandPurposeListContainer} />
        <Route path={`${match.url}/land-purpose/add`} component={LandPurposeAddContainer} />
        <Route path={`${match.url}/land-purpose/edit/:id`} component={LandPurposeEditContainer} />

        <Route path="*" component={NotFound}/>
    </Switch>
);
export default UserIsAuthenticated(ContructionsRouteComponent);