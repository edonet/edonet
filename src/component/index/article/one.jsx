'use strict';

require('./one.scss');

import React, { Component } from 'react';

class One extends Component {
    constructor() {
        super();
        this.state = { now: new Date() };
    }
    render() {
        var now = this.formatDate(this.state.now);

        return (
            <section className="index-content-first clearfix">
                <div className="fr">
                    <h2 className="index-title-h2">内容优先</h2>
                    <p>内容很重要，<br />只提供用户想要的东西</p>
                    <ul className="index-one-list">
                        <li>HTML5 语义化</li>
                        <li>提炼内容</li>
                        <li>精准推送</li>
                    </ul>
                </div>
                <div className="fl" ref="time">
                    <p className="index-one-time">{now.time}</p>
                    <p className="index-one-date">{now.date}</p>
                </div>
            </section>
        );
    }
    componentDidMount() {
        this.timeId = setInterval(() => {
            this.setState({ now: new Date() });
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    formatDate(date) {
        let year = date.getFullYear(),
            month = this.formatNumber(date.getMonth() + 1),
            day = this.formatNumber(date.getDate()),
            week = this.formatWeek(date.getDay()),
            hour = this.formatNumber(date.getHours()),
            minu = this.formatNumber(date.getMinutes());

        return {
            time: `${hour}:${minu}`,
            date: `${year}/${month}/${day} ${week}`
        };
    }
    formatWeek(week) {
        return `星期${One.weeks[week]}`;
    }
    formatNumber(number) {
        return number < 10 ? '0' + number: number;
    }
}

One.weeks = ['日', '一', '二', '三', '四', '五', '六'];

export default One;
