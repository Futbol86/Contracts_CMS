import React from 'react';
import {Row, Col} from 'reactstrap';
import NganChanList from '../../containers/NganChanList';

const AddEditNganChanModal = ({currentModalType, handleModalClose}) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                        <span className="sr-only">
                        Đóng
                    </span>
                </button>
            </div>
            <div className="modal-body">
                <Row>
                    <Col xs="12" className="pl-2">
                        <NganChanList hasSelectOption={true} currentModalType={currentModalType}/>
                    </Col>
                </Row>
            </div>
            <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                    <i className="fa fa-times fa-lg" /> {' '}
                    Đóng
                </button>
                <button type="button" className="btn btn-primary" onClick={handleModalClose}>
                    Đồng Ý
                </button>
            </div>
        </div>
    );
}

export default AddEditNganChanModal;