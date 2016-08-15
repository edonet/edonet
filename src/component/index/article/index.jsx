'use strict';

require('./index.scss');

import React, { Component } from 'react';
import SectionOne from './one';
import SectionTwo from './two';
import SectionThree from './three';
import SectionFour from './four';

class Article extends Component {
    render() {
        return (
            <article className="container index-article">
                <SectionOne />
                <SectionTwo />
                <SectionThree />
                <SectionFour />
            </article>
        );
    }
}

export default Article;
