'use strict';

import React, { Component, PropTypes } from 'react';
import CodeMirror from './codemirror';

require('./codemirror.css');
require('./markdown');

export default class CodeEditor extends Component {
    render() {
        return <textarea ref="mirror" defaultValue={ this.props.code || '' } />;
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.refs.mirror, {
            mode: 'markdown',
            lineNumbers: true,
            indentUnit: 4,
            undoDepth: 20
        });

        let update = this.props.update;

        this.editor.on('blur', (editor) => {
            update && update(editor.getValue(), editor);
        });

        this.editor.setSize('100%', '100%');
    }

    componentWillUnmount() {
        let dom = this.refs.mirror.nextSibling;

        dom.parentNode.removeChild(dom);
        this.editor = null;
    }
}

CodeEditor.propTypes = {
    code: PropTypes.string
};
