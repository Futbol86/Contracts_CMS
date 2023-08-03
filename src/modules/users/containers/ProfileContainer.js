import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfileComponent from "../components/ProfileComponent";
import {getUserId} from "../selectors";

import {loadAnAccountInfo} from "../../he-thongs/actions";
// import {getAccountInfo} from "../../he-thongs/selectors";

class ProfileContainer extends Component {
    componentDidMount() {
        const {userId} = this.props;
        if ( (userId) ) {
            this.props.loadAnAccountInfo({id: userId});
        }
    }

    render() {
        return (
            <ProfileComponent userId={this.props.userId} />
        );
    }
}

const mapStateToPros = (state) => ({
    userId: getUserId(state),
});

export default (connect(mapStateToPros, {loadAnAccountInfo})(ProfileContainer));