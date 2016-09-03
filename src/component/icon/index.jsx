'use strict';

import React, { Component, PropTypes } from 'react';

const
    icons = {
        code: {
            size: 16,
            path: <path d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path>
        },
        view: {
            size: 16,
            path: <path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
        },
        download: {
            size: 512,
            path: <path d="M368 224l-128 128-128-128h80v-192h96v192zM240 352h-240v128h480v-128h-240zM448 416h-64v-32h64v32z"/>
        }
    };


export default class Icon extends Component {
    render() {
        let size = this.props.size || 16,
            icon = icons[this.props.iconType],
            viewBox = [0, 0, icon.size, icon.size].join(' ');

        return (
            <svg className="icon-svg" width={ size } height={ size } version="1.1" viewBox={ viewBox }>
                { icon.path }
            </svg>
        );
    }
}

Icon.propTypes = {
    size: PropTypes.number,
    iconType: PropTypes.string.isRequired
};
