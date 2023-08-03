import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Row, Col, Label } from 'reactstrap';

class FieldSlider extends PureComponent {
    handleChange = (value) => {
        this.props.input.onChange(value)
    };

    render () {
        const { input, min, max, disabled, className, meta: {error, touched, warning}, required, ...rest } = this.props;
        return (
            <Row>
                <Col xs="10">
                    <Slider value={input.value} min={min} max={max} disabled={disabled} onChange={this.handleChange} />
                </Col>
                <Col xs="2">
                    <Label className="col-form-label" >
                        {input.value}
                    </Label>
                </Col>
            </Row>

      
        );
    }
}

FieldSlider.propTypes = {
    className: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    required: PropTypes.bool
};

FieldSlider.defaultProps = {
    className: 'form-control',
    required: false
};

export default FieldSlider;