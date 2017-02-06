import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sum from  './components/Sum/Sum';
import List from  './components/list/List';
const students = [
            {id:3 , text:"dikshitha" , css:"selected"},
            {id:4 , text:"anusha" , css:"empty"}
        ]
ReactDOM.render(
  <div>
    <App/>
    <Sum />
    <List header="Students" items={students} /> 
    </div>,
  document.getElementById('root')
);