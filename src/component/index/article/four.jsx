'use strict';

require('./four.scss');

import React, { Component } from 'react';

export default class Four extends Component {
    render() {
        return (
            <section className="index-art-four clearfix">
                <div className="fl align-r">
                    <h2 className="index-title-h2">微创新</h2>
                    <p>用小小的改变征服世界</p>
                </div>
            </section>
        );
    }
}
