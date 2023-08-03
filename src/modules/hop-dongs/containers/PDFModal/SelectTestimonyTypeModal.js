import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues, formValueSelector} from 'redux-form';

import SelectTestimonyTypeModalComponent from "../../components/PDFModal/SelectTestimonyTypeModal";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {DOC_exportTestimonialToWORD, clearDocExport} from "../../actions";
import {getHopDongInfo, getRemoteDOC} from "../../selectors";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {HOP_DONG_FORM_NAME, TESTIMONY_TYPE_SHEET} from "../../constants";

class SelectTestimonyTypeModal extends Component {
    handleModalChange = (modalId) => {
        if(modalId === 0) {
            let {testimony_type_sheet} = this.props;
            let pageData = this.props.pageData;
    
            let findOneTestimonyTypeSheet = TESTIMONY_TYPE_SHEET.find(item => item.id === parseInt(testimony_type_sheet));
            let pageId = findOneTestimonyTypeSheet ? findOneTestimonyTypeSheet.code : 0;
    
            this.props.DOC_exportTestimonialToWORD({
                pageId: pageId,
                pageData: {
                    ...pageData,
                    contractDetail: this.props.contractDetail
                }
            });
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
            <SelectTestimonyTypeModalComponent {...this.props} handleModalChange={this.handleModalChange}/>
        );
    }
}

const formSelector = formValueSelector(HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),

    remoteDOC:          getRemoteDOC(state),
    contractDetail:     getHopDongInfo(state),
    testimony_type_sheet:  formSelector(state, "testimony_type_sheet"),
});

export default connect(mapStateToProps, {DOC_changeActiveModal, DOC_exportTestimonialToWORD, clearDocExport})(SelectTestimonyTypeModal);