'use strict';

require('css/common.scss');

import React from 'react';
import { render } from 'react-dom';
import Index from './containers/index';

render(
    <Index />,
    document.getElementById('root')
);
