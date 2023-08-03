import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';

import nav from './_nav';
import navAdmin from './_navAdmin';
import navDealer from './_navDealer';
import navReporting from './_navReporting';
import SidebarFooter from '../SidebarFooter/SidebarFooter';
import SidebarForm from '../SidebarForm/SidebarForm';
import SidebarHeader from '../SidebarHeader';
import SidebarMinimizer from '../SidebarMinimizer';

import {auth} from '../../../services';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.activeRoute = this.activeRoute.bind(this);
        this.hideMobile = this.hideMobile.bind(this);
    }


    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName, props) {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

    }

    hideMobile() {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show')
        }
    }

    // todo Sidebar nav secondLevel
    // secondLevelActive(routeName) {
    //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    // }


    render() {

        const props = this.props;

        // badge addon to NavItem
        const badge = (badge) => {
            if (badge) {
                const classes = classNames( badge.class );
                return (<Badge className={ classes } color={ badge.variant }>{ badge.text }</Badge>)
            }
        };

        // simple wrapper for nav-title item
        const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)): item.name ) };

        // nav list section title
        const title =  (title, key) => {
            const classes = classNames( 'nav-title', title.class);
            return (<li key={key} className={ classes }>{wrapper(title)} </li>);
        };

        // nav list divider
        const divider = (divider, key) => {
            const classes = classNames( 'divider', divider.class);
            return (<li key={key} className={ classes }></li>);
        };

        // nav label with nav link
        const navLabel = (item, key) => {
            const classes = {
                item: classNames( 'hidden-cn', item.class ),
                link: classNames( 'nav-label', item.class ? item.class : ''),
                icon: classNames(
                    !item.icon ? 'fa fa-circle' : item.icon ,
                    item.label.variant ? `text-${item.label.variant}` : '',
                    item.label.class ?  item.label.class : ''
                )
            };
            return (
                navLink(item, key, classes)
            );
        };

        // nav item with nav link
        const navItem = (item, key) => {
            const classes = {
                item: classNames( item.class) ,
                link: classNames( 'nav-link', item.variant ? `nav-link-${item.variant}` : ''),
                icon: classNames( item.icon )
            };
            return (
                navLink(item, key, classes)
            )
        };

        // nav link
        const navLink = (item, key, classes) => {
            const url = item.url ? item.url : '';
            return (
                <NavItem key={key} className={classes.item}>
                    { isExternal(url) ?
                        <RsNavLink href={url} className={classes.link} active>
                            <i className={classes.icon}></i>{item.name}{badge(item.badge)}
                        </RsNavLink>
                        :
                        <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                            <i className={classes.icon}></i>{item.name}{badge(item.badge)}
                        </NavLink>
                    }
                </NavItem>
            )
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li key={key} className={this.activeRoute(item.url, props)}>
                    <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i className={item.icon}></i>{item.name}</a>
                    <ul className="nav-dropdown-items">
                        {navList(item.children)}
                    </ul>
                </li>)
        };

        // nav type
        const navType = (item, idx) =>
            item.title ? title(item, idx) :
                item.divider ? divider(item, idx) :
                    item.label ? navLabel(item, idx) :
                        item.children ? navDropdown(item, idx)
                            : navItem(item, idx) ;

        // nav list
        const navList = (items) => {
            return items.map( (item, index) => navType(item, index) );
        };

        const isExternal = (url) => {
            const link = url ? url.substring(0, 4) : '';
            return link === 'http';
        };

        const isAdmin = auth.checkIsAdmin(auth.getUserFromStorage());
        const isDealer = auth.isADealer();
        const hasUserManagementAccess = auth.checkUserManagementAccess();
        //const hasReportingAccess = auth.checkReportingAccess();

        const userData = auth.getUserFromStorage();
        const role_ids = userData.role_ids || [];

        if(userData.username !== "admin") {
            if(role_ids.indexOf(1) === -1) {
                delete nav.items[5]; // Admin
            } 
        }

        // console.log('--- role_ids', role_ids)
        // console.log('--- nav.items', nav.items)
        // console.log('--- nav.items[1].children', nav.items[1].children)
        if(userData.username !== "admin") {
            if(role_ids.length !== 0) {
                if(role_ids.indexOf(4) === -1)
                    delete nav.items[2].children[0]; // Owner
                if(role_ids.indexOf(5) === -1)
                    delete nav.items[2].children[1]; // Asset
                if(role_ids.indexOf(6) === -1)
                    delete nav.items[3].children[0]; // Contract

                if(role_ids.indexOf(10) === -1) // Archive Book
                    delete nav.items[2].children[5];
                if(role_ids.indexOf(11) === -1) // Contract Type
                    delete nav.items[2].children[2]; // 
                if(role_ids.indexOf(12) === -1) // Asset Type
                    delete nav.items[2].children[3]; // 
                if(role_ids.indexOf(13) === -1) // Archive Book Type
                    delete nav.items[2].children[4]; // 
                if(role_ids.indexOf(14) === -1) // Land Purpose
                    delete nav.items[2].children[6]; // 

                if(role_ids.indexOf(7) === -1)
                    delete nav.items[4].children[0].children[1]; // Asset Prevention
                if(role_ids.indexOf(8) === -1)
                    delete nav.items[4].children[1].children[1]; // Asset Release
                if(role_ids.indexOf(15) === -1)
                    delete nav.items[4].children[2].children[1]; // Thu Hồi/ Huỷ GCN

                if(role_ids.indexOf(9) === -1) // Thống kê
                    delete nav.items[5];
            } else {
                delete nav.items[2].children[0];
                delete nav.items[2].children[1];
                delete nav.items[2].children[2];
                delete nav.items[2].children[3];
                delete nav.items[2].children[4];
                delete nav.items[2].children[5];
                delete nav.items[2].children[6];

                delete nav.items[3].children[0];
                delete nav.items[3].children[1];
                delete nav.items[3].children[2];
                delete nav.items[4];
                delete nav.items[5];
            }
        }

        // sidebar-nav root
        return (
            <div className="sidebar">
                <SidebarHeader/>
                <SidebarForm/>
                <nav className="sidebar-nav">
                    <Nav>
                        {navList(nav.items)}
                        {/* hasReportingAccess && navList(navReporting.items) */}
                        {/* {navList(navReporting.items)} */}
                        { isAdmin && hasUserManagementAccess && navList(navAdmin.items) }
                        {/* { isDealer && navList(navDealer.items) } */}

                    </Nav>
                </nav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </div>
        )
    }
}

export default Sidebar;
