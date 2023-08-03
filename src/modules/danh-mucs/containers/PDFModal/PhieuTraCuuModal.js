import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, reset, getFormValues, SubmissionError} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import PhieuTraCuuModalComponent from "../../components/PDFModal/PhieuTraCuuModal";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {PHIEU_TRA_CUU_FORM_NAME} from '../../constants'
import {DOC_exportPhieuTraCuuToWORD, clearDocExport} from '../../actions';
import {getTaiSanList, getRemoteDOC, getTaiSanFilterInfo} from '../../selectors';
import {getUserData} from "../../../users/selectors";

class PhieuTraCuuModal extends Component {
    componentDidMount() {
        const {userData} = this.props;

        this.props.initialize({
            notary_name: userData && userData.fullname,
            group_name: userData && userData.userGroupDetail.group_name,
        })
    }

    handleModalChange = (modalId) => {
        const {assets, filter} = this.props;
        
        if(modalId === 0) {
            let {formDatas} = this.props;
            formDatas.assets = assets;
            formDatas.searchText = filter && filter.search;

            this.props.DOC_exportPhieuTraCuuToWORD(formDatas);
        }
    };

    componentDidUpdate(prevProps) {
        const {remoteDOC} = this.props;
        const uploadRootURL = process.env.REACT_APP_STATIC_FILE_URL;

        if(remoteDOC !== prevProps.remoteDOC) {
            let url = uploadRootURL + remoteDOC; //"http://localhost:4000/" + remoteDOC;
            window.open(url, "_blank");

            this.props.DOC_changeActiveModal({modalId: 0});
        }
    }

    componentWillUnmount() {
        this.props.clearDocExport();
    }

    render() {
        return (
            <PhieuTraCuuModalComponent {...this.props} handleModalChange={this.handleModalChange}/>
        );
    }
}

const mapStateToProps = (state) => ({
    userData:           getUserData(state),
    currentModalId:     getDocCurrentModalId(state),
    remoteDOC:          getRemoteDOC(state),

    formDatas:          getFormValues(PHIEU_TRA_CUU_FORM_NAME)(state),
    filter:             getTaiSanFilterInfo(state),
    assets:             getTaiSanList(state),
});

export default connect(mapStateToProps, {DOC_exportPhieuTraCuuToWORD, DOC_changeActiveModal, clearDocExport})(
    reduxForm({
        form: PHIEU_TRA_CUU_FORM_NAME,
        onSubmit: onSubmitActions(PHIEU_TRA_CUU_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(PhieuTraCuuModal)
);