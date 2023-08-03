import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {Badge} from 'reactstrap'
import PropTypes from "prop-types";

const LandDataOfTNMTReportListItem = ({index, requestLandDataOfTNMTReport}) => {
    const { 
        departmentCode, departmentName, transactionCode, transactionDate, price
    } = requestLandDataOfTNMTReport || {};

    return (
        <tr>
            <td>
                {index}
            </td>
            <td>
                {departmentCode}
            </td>
            <td>
                {departmentName}
            </td>
            <td>
                {transactionCode}
            </td>
            <td>
                {
                    transactionDate && 
                    <React.Fragment>
                        <FormattedTime value={transactionDate}></FormattedTime>{`  `}
                        <FormattedDate value={transactionDate}>
                            {
                                parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                            }
                        </FormattedDate>
                    </React.Fragment>
                }
            </td>
            <td>
                <FormattedNumber value={price}></FormattedNumber>
                {/* {price} */}
            </td>
        </tr>
    )
};

LandDataOfTNMTReportListItem.propTypes = {
    requestLandDataOfTNMTReport: PropTypes.object.isRequired
};

export default LandDataOfTNMTReportListItem;