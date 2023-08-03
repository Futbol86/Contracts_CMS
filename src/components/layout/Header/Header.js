import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import {
    NavbarToggler,
    NavbarBrand,
    Nav, NavItem, NavLink
} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import HeaderDropdown from "./HeaderDropdown";

import {auth} from '../../../services';
import {API_SUB_URL_SYSTEM_FILE} from '../../../modules/he-thongs/constants';
import {getSystemConfigList} from '../../../modules/he-thongs/selectors';

class Header extends Component {

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    // asideToggle(e) {
    //   e.preventDefault();
    //   document.body.classList.toggle('aside-menu-hidden');
    // }

    render() {
        const dealerLogo = auth.getDealerLogo();
        console.log('--- dealerLogo', dealerLogo)
        const staticFileUrl = process.env.REACT_APP_STATIC_FILE_URL2;
        let findAHDSDFile = this.props.systemConfigs.find(item => item.param_name === "hdsdFile");
        let file_name = findAHDSDFile && findAHDSDFile.param_value;

        return (
            <header className="app-header navbar">
                <LoadingBar showFastActions style={{ backgroundColor: 'red', marginTop: '27px' }}  />
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavbarBrand href="#" style={dealerLogo ? {backgroundImage: `url(${dealerLogo})`} : {}}></NavbarBrand>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="/dashboard"><FormattedMessage id="app.Dashboard" defaultMessage="Trang chủ" /></NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="/users/profile"><FormattedMessage id="app.Users" defaultMessage="Users" /></NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="/he-thongs/system-configs"><FormattedMessage id="app.Settings" defaultMessage="Cấu hình" /></NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                    {/* <a href={`${staticFileUrl}${API_SUB_URL_SYSTEM_FILE}/${file_name}`} target="_blank">{file_name && file_name.substring(10)}</a> */}
                        <NavLink href={`${staticFileUrl}${API_SUB_URL_SYSTEM_FILE}/${file_name}`} target="_blank">Hướng dẫn sử dụng</NavLink>
                    </NavItem>
                    <HeaderDropdown />
                </Nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    systemConfigs:          getSystemConfigList(state),
});

export default connect(mapStateToProps, {})(Header);
