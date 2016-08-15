'use strict';

require('./two.scss');

import React, { Component } from 'react';

export default class Two extends Component {
    render() {
        return (
            <section className="index-art-two">
                <div className="align-r">
                    <h2 className="index-title-h2">体验至上</h2>
                    <p>好的体验是一种享受</p>
                </div>
                <ul className="index-two-list">
                    <li className="fl">内容清晰</li>
                    <li className="fl">速度快</li>
                    <li className="fl">简单易用</li>
                    <li className="fl">质感</li>
                    <li className="fl">大气</li>
                    <li className="fl">耳目一新</li>
                    <li className="fl">有创意</li>
                    <li className="fl">过渡自然</li>
                    <li className="fl">有惊喜</li>
                    <li className="fl">细节很重要</li>
                    <li className="fl">服务意识</li>
                </ul>
            </section>
        );
    }
}
