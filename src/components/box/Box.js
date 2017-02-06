import React from 'react';
import './Box.css';

export default function Box (props) {
    return (
        <div className="box" className={props.css} data-id={props.id} onClick={props.click}>{props.text}</div>
    );
}