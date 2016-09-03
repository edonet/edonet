'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

require('./index.scss');

class Header extends Component {
    render() {
        return (
            <header className="page-header">
                <div className="container">
                    <Link className="inline" to="/"><h1 className="page-logo">edonet github</h1></Link>
                </div>
            </header>
        );
    }
}

export default Header;
