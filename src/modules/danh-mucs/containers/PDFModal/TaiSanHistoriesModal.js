import React, {Component} from 'react';
import {connect} from 'react-redux';

import TaiSanHistoriesModalComponent from "../../components/PDFModal/TaiSanHistoriesModal";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {getTaiSanHistories} from "../../selectors";

class TaiSanHistoriesModal extends Component {
    render() {
        return (
            <TaiSanHistoriesModalComponent {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
    assetHistories:     getTaiSanHistories(state),
});

export default connect(mapStateToProps, {DOC_changeActiveModal})(TaiSanHistoriesModal);