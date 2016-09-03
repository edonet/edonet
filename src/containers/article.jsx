'use strict';

import React, { Component } from 'react';
import Header from '../component/header';
import Editor from '../component/editor';

class Article extends Component {
    render() {
        return (
            <div>
                <Header />
                <Editor { ...this.props } />
            </div>
        );
    }
}

export default Article;
