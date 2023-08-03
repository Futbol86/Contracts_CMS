import React from 'react';
import {injectIntl} from 'react-intl';
import {Col, Row, Label} from 'reactstrap';

class ShowMoreInfoModal extends React.Component {
    render(){
        const { fullContext, handleModalClose } = this.props;
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Hiển thị thông tin
                    </h4>
                    <button type="button" className="close" onClick={handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">
                            Đóng
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col md="12">
                            <div dangerouslySetInnerHTML={{__html: fullContext}} style={{whiteSpace: "pre-wrap"}}></div>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        Đóng
                    </button>
                </div>
            </div>
        );
    }
}

export default injectIntl(ShowMoreInfoModal);