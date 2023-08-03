import React from 'react';
import {Row, Col} from 'reactstrap';
import TaiSanAddContainer from '../../../danh-mucs/containers/TaiSanAdd';

const AddTaiSanModal = ({hiddenReturnButton, handleModalClose}) => {
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
                        <TaiSanAddContainer hiddenReturnButton={hiddenReturnButton}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default AddTaiSanModal;