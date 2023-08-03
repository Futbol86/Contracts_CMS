import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues, formValueSelector} from 'redux-form';

import PDFModalComponent from "../../components/PDFModal/CommonPDFModal";
import {DOC_exportContractToPDF, DOC_exportContractToWORD} from "../../actions";
import {getRemotePDF, getHopDongInfo} from "../../selectors";
import {getDocCurrentModalId, getDocCurrentModalType} from "../../../documents/selectors";
import {HOP_DONG_FORM_NAME, CONTRACT_TYPE_SHEET} from "../../constants";

class ContractPDFModal extends Component {
    componentDidMount = async() => {
        let {contract_type_sheet} = this.props;
        let pageData = this.props.pageData;

       // let findOneContractTypeSheet = CONTRACT_TYPE_SHEET.find(item => item.id === parseInt(contract_type_sheet));
        let findOneContractTypeSheet = CONTRACT_TYPE_SHEET.find(item => item.id === 1);
        let pageId = findOneContractTypeSheet ? findOneContractTypeSheet.code : 0;

        this.props.DOC_exportContractToPDF({
            pageId: pageId,
            pageData: {
                ...pageData,
                contractDetail: this.props.contractDetail
                // contructionDetails: this.props.contructionDetails,
                // contructionNotes: this.props.contructionNotes,
            }
        });
    }

    render() {
        return (
            <PDFModalComponent {...this.props} pageTitleId="app.hop_dongs.contract" />
        );
    }
}

const formSelector = formValueSelector(HOP_DONG_FORM_NAME);
const mapStateToProps = (state) => ({
    remotePDF:          getRemotePDF(state),
    contractDetail:     getHopDongInfo(state),
    contract_type_sheet:  formSelector(state, "contract_type_sheet"),

    currentModalId:     getDocCurrentModalId(state),
});

export default connect(mapStateToProps, {DOC_exportContractToPDF, DOC_exportContractToWORD})(ContractPDFModal);