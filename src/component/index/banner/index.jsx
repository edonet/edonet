'use strict';

require('./index.scss');

import React, { Component, PropTypes } from 'react';
import canvas, { ready } from './canvas';

class Banner extends Component {
    render() {
        let style = {
                height: this.props.height || '300px'
            };

        return (
            <div className="banner-wrapper" style={ style } ref="wrapper">
                <canvas className="banner-canvas" ref="canvas">
                    您的浏览器不支持此功能，建议立即更新，以更为您带来更好的体验。
                </canvas>
            </div>
        );
    }
    componentDidMount() {
        this.canvas = canvas(this.refs.canvas);

        ready(() => {
            this.canvas.render();
            this.refs.wrapper
                .setAttribute('class', 'banner-wrapper show');
        });
    }
    componentWillUnmount() {
        this.canvas.destroy();
    }
}


Banner.propTypes = {
    height: PropTypes.string
};

export default Banner;
