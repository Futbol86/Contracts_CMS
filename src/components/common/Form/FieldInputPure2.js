import React from 'react';
import {Input, FormText} from 'reactstrap';
import classnames from "classnames";

const FieldInputPure2 = ({input, label, rows, type, readOnly, className, autoComplete, style, meta: {error, touched, warning}}) => {
    if (className)
        input = Object.assign({}, input, {className: classnames(input.className, className)});
    if (touched && error)
        input = Object.assign({}, input, {className: classnames(input.className, 'is-invalid')});
    return (
        <React.Fragment>
            <input {...input} placeholder={label} type={type} rows={rows} readOnly={readOnly} style={style} autoComplete = {autoComplete}/>
            {touched && error && <FormText color="red">{error}</FormText>}
            {touched && warning && <FormText color="warning">{warning}</FormText>}
        </React.Fragment>
    )
};

export default FieldInputPure2;