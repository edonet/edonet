'use strict';

require('css/common.scss');

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Index from './containers/index';
import Article from './containers/article';

render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={Index} />
            <Route path="/article(/:name)" component={Article} />
        </Router>
    ),
    document.getElementById('root')
);
