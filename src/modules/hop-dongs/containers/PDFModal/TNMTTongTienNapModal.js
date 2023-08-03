import React, {Component} from 'react';
import {connect} from 'react-redux';

import TNMTTongTienNapModalComponent from "../../components/PDFModal/TNMTTongTienNapModal";
import {DOC_changeActiveModal} from "../../../documents/actions";
import {getDocCurrentModalId} from "../../../documents/selectors";
import {getTMNTLandData} from "../../selectors";

class TNMTTongTienNapModal extends Component {
    render() {
        return (
            <TNMTTongTienNapModalComponent {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    currentModalId:     getDocCurrentModalId(state),
});

export default connect(mapStateToProps, {DOC_changeActiveModal})(TNMTTongTienNapModal);