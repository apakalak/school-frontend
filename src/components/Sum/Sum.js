import React from 'react';
import './Sum.css';

export default class Sum extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.add = this.add.bind(this);
    }

    render(){
        return (
            <div className="sum">
                <h1>Sum</h1>

                <input className="a" ref={n => this.a = n} type='number'/>
                <input className="b" ref={n => this.b = n} type='number'/>
                <button id="add" onClick={this.add}>+</button>
                <span>{this.state.result}</span>
            </div>
        );
    }

    add(){
        this.setState({result: (+this.a.value + +this.b.value)})
    }
}