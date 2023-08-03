import React from 'react';
import {Row, Col, Alert, Label} from 'reactstrap';

const AlertModal = ({text, color, handleModalClose}) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">
                    Thông báo
                </h4>
                <button type="button" className="close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                    <span className="sr-only">
                        Đóng
                    </span>
                </button>
            </div>
            <div className="modal-body">
                <Alert color={color}>
                    {text}
                </Alert>
            </div>
        </div>
    );
}

export default AlertModal;