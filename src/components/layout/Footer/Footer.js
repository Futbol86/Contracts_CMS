import React, {Component} from 'react';

class Footer extends Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <footer className="app-footer d-flex justify-content-center">
                <span>
                    <a href="#" target="_blank" rel="noopener noreferrer">Giao Dịch Bảo Đảm</a> &copy; {year}.
                </span>
            </footer>
        )
    }
}

export default Footer;
