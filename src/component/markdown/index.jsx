'use strict';

import React, { Component, PropTypes } from 'react';

require('css/github.css');

const
    marked = require('js/marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

export default class Markdown extends Component {
    render() {
        let html = marked(this.props.code),
            className = ['markdown-body'];

        if (this.props.className) {
            className.push(this.props.className);
        }

        return <article className={ className.join(' ')} dangerouslySetInnerHTML={{ __html: html }} />;
    }
}

Markdown.propTypes = {
    code: PropTypes.string.isRequired,
    className: PropTypes.string
};
