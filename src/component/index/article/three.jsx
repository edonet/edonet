'use strict';

require('./three.scss');

import React, { Component } from 'react';
import { animate } from 'js/animation';

export default class Three extends Component {
    constructor() {
        super();

        let points = [],
            i = -1;

        while (i < 9) {
            points.push(i ++ * 50);
            points.push(parseInt(Math.random() * 150 + 20));
        }

        this.state = {
            points: points
        };
    }
    render() {
        let points = this.state.points,
            circle = [],
            curr;

        for (let i = 0; i < 20; i += 2) {
            circle.push(<circle key={ circle.length } r="5" cx={ points[i] } cy={ points[i + 1] } />);
        }

        curr = points[17] + (points[19] - points[17]) * (400 - points[16]) / 50;

        return (
            <section className="index-art-three clearfix">
                <div className="fr">
                    <h2 className="index-title-h2">及时刷新</h2>
                    <p>定期采集并更新您的数据库</p>
                </div>
                <div className="fl">
                    <svg version="1.1"
                         width="100%"
                         height="100%"
                         viewBox="-10, -10, 420, 210"
                         baseProfile="full">

                        <g fill="none" stroke="#e2e2e2">
                            <line x1="0" x2="400" y1="0" y2="0" />
                            <line x1="0" x2="400" y1="50" y2="50" />
                            <line x1="0" x2="400" y1="100" y2="100" />
                            <line x1="0" x2="400" y1="150" y2="150" />
                        </g>
                        <g fill="none" stroke="#e2e2e2">
                            <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="2s" values="0, 0; -50, 0" repeatCount="indefinite" />
                            <line x1="50" x2="50" y1="0" y2="200" ></line>
                            <line x1="100" x2="100" y1="0" y2="200" ></line>
                            <line x1="150" x2="150" y1="0" y2="200" ></line>
                            <line x1="200" x2="200" y1="0" y2="200" ></line>
                            <line x1="250" x2="250" y1="0" y2="200" ></line>
                            <line x1="300" x2="300" y1="0" y2="200" ></line>
                            <line x1="350" x2="350" y1="0" y2="200" ></line>
                            <line x1="400" x2="400" y1="0" y2="200" ></line>
                        </g>
                        <polyline id="tb-l" fill="none" stroke="#5fc8fb" points={ points.join(',') } />
                        <g id="tb-p" fill="#5fc8fb" stroke="#f5f5f5" strokeWidth="2">{ circle }</g>
                        <rect fill="#f5f5f5" x="400" y="0" width="40" height="200" />
                        <g id="tb-c">
                            <circle fill="#ff68a3" cx="400" cy={ curr } r="5">
                              <animate attributeName="r" attributeType="XML" values="5; 10" dur="1s" repeatCount="indefinite" />
                              <animate attributeName="opacity" attributeType="XML" values="1; 0" dur="1s" repeatCount="indefinite" />
                            </circle>
                            <circle fill="#ff68a3" stroke="#f5f5f5" strokeWidth="2" cx="400" cy={ curr } r="5" />
                        </g>
                    </svg>
                </div>
            </section>
        );
    }
    componentDidMount() {
        let points = this.state.points;

        animate(() => {
            let i = 10;

            while(i --){
                points[2 * i] -= 0.3;
            }

            if(points[0] < -50){
                points = points.slice(2);
                points.push(450, parseInt(Math.random() * 150 + 20));
            }

            this.setState({
                points: points
            });

            return this.nextAnimation;
        });
    }
    componentWillUnmount() {
        this.nextAnimation = false;
    }
}
