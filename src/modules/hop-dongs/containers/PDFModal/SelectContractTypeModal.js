import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues, formValueSelector} from 'redux-form';

import SelectContractTypeModalComponent from "../../components/PDFModal/SelectContractTypeModal";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {DOC_exportContractToWORD, clearDocExport} from "../../actions";
import {getRemoteDOC, getHopDongInfo} from "../../selectors";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {HOP_DONG_FORM_NAME, CONTRACT_TYPE_SHEET } from "../../constants";

class SelectContractTypeModal extends Component {
    handleModalChange = (modalId) => {
        if(modalId === 0) {
            let {contract_type_sheet} = this.props;
            let pageData = this.props.pageData;
    
            let findOneContractTypeSheet = CONTRACT_TYPE_SHEET.find(item => item.id === parseInt(contract_type_sheet));
            let pageId = findOneContractTypeSheet ? findOneContractTypeSheet.code : 0;

            this.props.DOC_exportContractToWORD({
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
            <SelectContractTypeModalComponent {...this.props} handleModalChange={this.handleModalChange}/>
        );
    }
}

const formSelector = formValueSelector(HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),

    contractDetail:     getHopDongInfo(state),
    contract_type_sheet:  formSelector(state, "contract_type_sheet"),
    remoteDOC:          getRemoteDOC(state),
});

export default connect(mapStateToProps, {DOC_changeActiveModal, DOC_exportContractToWORD, clearDocExport})(SelectContractTypeModal);