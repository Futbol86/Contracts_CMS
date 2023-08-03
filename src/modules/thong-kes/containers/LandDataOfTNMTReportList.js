import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import uuid from "uuid";

import {openModalAction} from "../../../actions";
import {MODAL_TYPE_CONFIRMATION} from '../../../constants';
import {loadListLandDataReportOfTNTM} from '../actions';
import {getRequestLandDataOfTNMTReportList} from "../selectors";
import {getUserData} from "../../users/selectors";
import {getDocCurrentModalType} from "../../documents/selectors";
import {PAGINATION_ITEMS_PER_PAGE} from "../constants";
import LandDataOfTNMTReportListComponent from "../components/LandDataOfTNMTReportList";

class LandDataOfTNMTReportList extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        // if (history.action === 'POP')
        //     return null;
        if(userData.role_ids) {
            if(userData.role_ids && userData.role_ids.indexOf(9) === -1) {
                history.push("/dashboard");
            }
        }

        let requestTNMTPayload = {
            username: userData.userGroupDetail.userRequestTNMTData,
            password: userData.userGroupDetail.passwordRequestTNMTData,
            departmentCode: userData.userGroupDetail.departmentCode,
            fromDate: new Date(),
            toDate: new Date(),
        }

        this.props.loadListLandDataReportOfTNTM(requestTNMTPayload);
    }

    render() {
        return (
            <LandDataOfTNMTReportListComponent {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    userData:                          getUserData(state),
    requestLandDataOfTNMTReports:      getRequestLandDataOfTNMTReportList(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadListLandDataReportOfTNTM:    payload => dispatch(loadListLandDataReportOfTNTM(payload)),

    openModalAction:                 payload => dispatch(openModalAction(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LandDataOfTNMTReportList));