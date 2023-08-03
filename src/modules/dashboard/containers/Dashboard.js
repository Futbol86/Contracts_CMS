import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import {loadListReport} from '../../thong-kes/actions';
import {getReportList} from '../../thong-kes/selectors';
import {loadListSystemConfig, clearASystemConfig} from '../../he-thongs/actions';
import {getSystemConfigList} from '../../he-thongs/selectors';

import {requestTNMTTongTienNap} from '../../hop-dongs/actions';
import {getTMNTTongTienNap} from '../../hop-dongs/selectors';

import {getUserData} from "../../users/selectors";

import DashboardComponent from "../components/Dashboard";

class Dashboard extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        if (history.action === 'POP')
            return null;

        // let requestTNMTPayload = {
        //     username: userData.userGroupDetail.userRequestTNMTData,
        //     password: userData.userGroupDetail.passwordRequestTNMTData,
        //     departmentCode: userData.userGroupDetail.departmentCode,
        // }

        // let payload = {};
        // let filter = {};
        // filter.user_id = userData.id;
        // filter.group_id = userData.userGroupDetail.id;
        // payload.filter = filter;

        // this.props.requestTNMTTongTienNap(requestTNMTPayload)
        // this.props.loadListReport(payload);
        this.props.loadListSystemConfig({limit: 1000});
    }

    // componentWillUnmount() {
    //     this.props.clearASystemConfig();
    // }

    render() {
        return (
            <DashboardComponent {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    userData:               getUserData(state),
    // reports:                getReportList(state),
    systemConfigs:          getSystemConfigList(state),
    // tongTienNapTNMT:        getTMNTTongTienNap(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListReport:         payload => dispatch(loadListReport(payload)),
    loadListSystemConfig:   payload => dispatch(loadListSystemConfig(payload)),
    clearASystemConfig:     payload => dispatch(clearASystemConfig(payload)),
    requestTNMTTongTienNap: payload => dispatch(requestTNMTTongTienNap(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));