import React, { Component } from 'react';
import {Field} from "redux-form";
import {Row, Col, Label, Button} from 'reactstrap';
import QRCode from 'qrcode.react';
import {FieldInputPure} from "../../../../components/common/Form/index";

const downloadQR = (qr_code_text) => {
    const canvas = document.getElementById('qrCode');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    // console.log('--- pngUrl', pngUrl);
    // console.log('--- canvas', canvas);
    
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode" + qr_code_text + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

const QRCodeGeneratorComponent = ({ qr_code_text }) => {
    // console.log('---- QRCodeGeneratorComponent', qr_code_text)
    return (
        <>
            <Row className="mb-3">
                <Col md="4">
                    <Label className="col-form-label">
                        Nhập mã tạo QR Code:
                    </Label>
                </Col>
                <Col md="8">
                    <Field  name={`qr_code_text`}
                            type="text"
                            component={FieldInputPure}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm={12}>
                    <QRCode 
                        id='qrCode'
                        value={qr_code_text} //'https://viblo.asia/u/tranchien'
                        size={290}
                        level={'H'}
                        includeMargin={true}
                    />
                    <br />
                    {/* <button onClick={createQR}>Tạo QR Code</button> */}
                    {/* <button onClick={downloadQR}></button> */}
                </Col>
                <Col sm={12} className='text-center'>
                    <Button color="info" onClick={() => downloadQR(qr_code_text || "empty")}>
                        Download QR
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default QRCodeGeneratorComponent;