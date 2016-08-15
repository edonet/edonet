'use strict';

import React, { Component } from 'react';
import Header from '../component/header';
import Banner from '../component/index/Banner';
import Article from '../component/index/article';
import Footer from '../component/footer';

class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Banner />
                <Article />
                <Footer />
            </div>
        );
    }
}

export default Index;
