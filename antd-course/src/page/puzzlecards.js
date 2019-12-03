import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';
//connect 方法返回的也是一个 React 组件，通常称为容器组件。
const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            });
        },
    };
}

@connect(mapStateToProps, mapDispatchToProps)
//connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。
//connect 让组件获取到两样东西：1. model 中的数据；2. 驱动 model 改变的方法。
//connect 本质上只是一个 javascript 函数，通过 @装饰器语法使用，放置在组件定义的上方；
//connect 既然是函数，就可以接受入参，第一个入参是最常用的，它需要是一个函数，我们习惯给它命名叫做 mapStateToProps，顾名思义就是把 dva model 中的 state 通过组件的 props 注入给组件。通过实现这个函数，我们就能实现把 dva model 的 state 注入给组件。
//mapStateToProps 这个函数的入参 state 其实是 dva 中所有 state 的总合。传入的 state 是个 "完全体"，包含了 所有 namespace 下的 state！


export default class PuzzleCardsPage extends Component {
    componentDidMount() {
        this.props.onDidMount();
    }
    render() {
        return (
            <div>
                {
                    this.props.cardList.map(card => {
                        console.log(card)
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        );
                    })
                }
            </div>
        );
    }
}