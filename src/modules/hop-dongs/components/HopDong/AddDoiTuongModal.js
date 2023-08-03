import React from 'react';
import {Row, Col} from 'reactstrap';
import DoiTuongAddContainer from '../../../danh-mucs/containers/DoiTuongAdd';
import TaiSanAddContainer from '../../../danh-mucs/containers/TaiSanAdd';
const AddDoiTuongModal = ({doiTuongType, hiddenReturnButton, handleModalClose}) => {
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
                <DoiTuongAddContainer doiTuongType={doiTuongType} hiddenReturnButton={hiddenReturnButton}/>
            </div>
        </div>
    );
}

export default AddDoiTuongModal;