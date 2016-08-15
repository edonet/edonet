'use strict';

require('./index.scss');

import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="page-footer align-c">
                Copyright © 2015-2020 edonet，All Rights Reserved. Designed by Erik.
            </footer>
        );
    }
}
