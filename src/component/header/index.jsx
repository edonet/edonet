'use strict';

import React, { Component } from 'react';

require('./index.scss');

class Header extends Component {
    render() {
        return (
            <header className="page-header">
                <div className="container">
                    <h1 className="page-logo">edonet github</h1>
                </div>
            </header>
        );
    }
}

export default Header;
