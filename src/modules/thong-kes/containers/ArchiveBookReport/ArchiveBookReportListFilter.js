import React, { Component } from 'react';
import {reduxForm, formValueSelector, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import { onSubmitActions } from 'redux-form-submit-saga';
import ArchiveBookReportListFilterComponent from '../../components/ArchiveBookReport/ArchiveBookReportListFilter';
import {ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME} from '../../constants';
import {getUserData} from "../../../users/selectors";
import {loadListSoLuuTru, loadListLoaiSoLuuTru} from "../../../danh-mucs/actions";
import {getLoaiSoLuuTruList, getSoLuuTruList,} from "../../../danh-mucs/selectors";
import {loadListUserGroup,} from "../../../he-thongs/actions";
import {getUserGroupList,} from "../../../he-thongs/selectors";

class ArchiveBookReportListFilter extends Component {
    componentDidMount() {
        const {userData} = this.props;
        //this.props.loadListUserGroup({limit: 100000});
        this.props.loadListSoLuuTru({limit: 10000000, filter: {group_id: userData.group_id}});
        this.props.loadListLoaiSoLuuTru({limit: 10000});
        this.props.initialize({group_id: userData && userData.userGroupDetail.id});
    }

    render() {
        return (
            <ArchiveBookReportListFilterComponent {...this.props} />
        )
    }
}


const formSelector = formValueSelector(ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME);
const mapStateToProps = (state) => ({
    userData:               getUserData(state),
    // user_groups:            getUserGroupList(state),
    archive_books:          getSoLuuTruList(state),
    archive_book_types:     getLoaiSoLuuTruList(state),

    //user_group_id:          formSelector(state, "user_group_id"),
    archive_book_type_id:   formSelector(state, "archive_book_type_id"),

    filterData:     getFormValues(ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME)(state),
});

const mapDispatchToProps = (dispatch) => ({
    // loadListUserGroup:      payload => dispatch(loadListUserGroup(payload)),
    loadListSoLuuTru:       payload => dispatch(loadListSoLuuTru(payload)),
    loadListLoaiSoLuuTru:   payload => dispatch(loadListLoaiSoLuuTru(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME,
        onSubmit: onSubmitActions(ARCHIVE_BOOK_REPORT_LIST_FILTER_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })(ArchiveBookReportListFilter)
);