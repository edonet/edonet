'use strict';

import React, { Component } from 'react';
import Icon from '../icon';
import Markdown from '../markdown';

require('./index.scss');

export default class Editor extends Component {
    constructor() {
        super();

        this.localStorageId = 'EDONET_ARTICLE_VALUE';
        this.state = { mode: 'code' };
    }

    render() {
        let code = localStorage.getItem(this.localStorageId) || '# hello edonet!';

        this.name = this.props.params.name || 'undefined';
        return this.state.mode === 'code' ?
            this.renderCodePage(code) : this.renderViewPage(code);
    }

    renderCodePage(code) {
        return (
            <div className="article-page">
                <div className="article-toolbar">
                    <div className="container">
                        <h2 className="article-name">
                            <Icon iconType="code" />
                            <strong>{ this.name }.md</strong>
                        </h2>
                        <p className="article-tab" onClick={ this.displayViewPage.bind(this) }>
                            <Icon iconType="view" />
                            <span>View</span>
                        </p>
                        <p className="article-tab" onClick={ this.downloadCode.bind(this) }>
                            <Icon iconType="download" />
                            <span>Download</span>
                        </p>
                    </div>
                </div>
                <div className="article-content">
                    <div className="container">
                        <textarea className="editor-area" onBlur={ this.saveCode.bind(this) } defaultValue={ code } />
                    </div>
                </div>
            </div>
        );
    }

    renderViewPage(code) {
        return (
            <div className="article-page">
                <div className="article-toolbar">
                    <div className="container">
                        <h2 className="article-tab" onClick={ this.displayCodePage.bind(this) }>
                            <Icon iconType="code" />
                            <span>Code</span>
                        </h2>
                        <p className="article-name">
                            <Icon iconType="view" />
                            <strong>{ this.name }.html</strong>
                        </p>
                        <p className="article-tab" onClick={ this.downloadCode.bind(this) }>
                            <Icon iconType="download" />
                            <span>Download</span>
                        </p>
                    </div>
                </div>
                <div className="article-content">
                    <div className="article-view container">
                        <Markdown code={ code } />
                    </div>
                </div>
            </div>
        );
    }

    displayCodePage() {
        this.setState({ mode: 'code' });
    }

    displayViewPage() {
        this.setState({ mode: 'view' });
    }

    saveCode(e) {
        localStorage.setItem(this.localStorageId, e.target.value);
    }

    downloadCode() {
        let code = localStorage.getItem(this.localStorageId),
            blob = new Blob([code]),
            a = document.createElement('a');

        a.href = window.URL.createObjectURL(blob);
        a.download = this.name + '.md';
        a.textContent = 'download';
        a.style.display = 'none';

        a.click();
    }
}

