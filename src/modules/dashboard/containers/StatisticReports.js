import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import {DOC_loadListNewReports} from '../actions';
import {getNewReportsDetail} from '../selectors';

import {getUserData} from "../../users/selectors";
import StatisticReportsComponent from "../components/StatisticReports";

class StatisticReports extends Component {
    componentDidMount() {
        const {history, userData} = this.props;
        if (history.action === 'POP')
            return null;

        this.props.DOC_loadListNewReports({});
    }

    render() {
        return (
            <StatisticReportsComponent {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    userData:               getUserData(state),
    newReports:             getNewReportsDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
    DOC_loadListNewReports:         payload => dispatch(DOC_loadListNewReports(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticReports));