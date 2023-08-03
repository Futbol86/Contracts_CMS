import React from 'react';
import { Input } from 'reactstrap';

class FieldDropdownList extends React.Component {
    render() {
        const { input, data, valueField, textField, titleOption, className } = this.props;
        if (!data)
            return null;
        return (
            <Input type="select" {...input} className={`flat ${className}`}>
                {titleOption ? <option value="">
                        {titleOption}
                    </option>
                    : null
                }
                {data.map((item, idx) => (
                    <option key={idx} value={item[valueField]}>
                        {item[textField]}
                    </option>
                ))}
            </Input>
        );
    }
}

export default FieldDropdownList;