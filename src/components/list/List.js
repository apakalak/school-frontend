import React from 'react';
import './List.css';
import Box from '../box/Box';

export default function List (props){
    var arr = props.items ? props.items : []
    return (
        <div className="list">
            <h1>{props.header}</h1>
            <div className="items">
                {
                    arr.map((item,i) => 
                        <Box key={i} text={item.text} id={item.id} css={item.css}/>
                    )
                }
            </div>
        </div>
    );
}