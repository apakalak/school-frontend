import React, { Component } from 'react';
import axios from 'axios'
import CreateStudent from './components/CreateStudent/CreateStudent'
import CreateKlass from './components/CreateKlass/CreateKlass'
import List from  './components/list/List';
import './App.css'

 const host = "http://localhost:9000"

class RegistrationApp extends Component {
  constructor(props){
    super(props) 
    this.state = {
        "students":[],
        "classes":[]
      }  
    this.bindStudents = this.bindStudents.bind(this)  
    this.bindClasses = this.bindClasses.bind(this)  
    this.studentClicked = this.studentClicked.bind(this)  
    this.classClicked = this.classClicked.bind(this)  
    this.studentCreated = this.studentCreated.bind(this)
    this.classCreated = this.classCreated.bind(this) 
    this.bindStudents(); 
    this.bindClasses();
  }

  bindStudents(){
    axios.get(host + "/students").then(data => {
      var list = data.data.map(item => {
        return {id:item.id,text:item.email}
      })
      this.setState({"students": list})
    }).catch(error => {
        this.setState({error: error.message})
    })
  }

  bindClasses(){
    axios.get(host + "/klasses").then(data => {
      var list = data.data.map(item => {
        return {id:item.id,text:item.name}
      })
      this.setState({"classes": list})
    }).catch(error => {
        this.setState({error: error.message})
    })
  }

  studentClicked(e){
    console.log(e.target)
  }

  classClicked(e){
    console.log(e.target)

  }
 
  studentCreated(data){
    var arr = this.state.students
    arr.push({"id":data.id,"text":data.email})
    this.setState({"students": arr})
  }

  classCreated(data){
    var arr = this.state.classes
    arr.push({"id":data.id,"text":data.name})
    this.setState({"classes": arr})
    
  }
  render() {
    return (
      <div className="app">
        <h1>Student Registration</h1>
        <div className="components">
        <div>
          <CreateStudent  host={host} created={this.studentCreated}/>
          <List header="Students" items={this.state.students} click={this.studentClicked}/> 
        </div>
        <div>
          <CreateKlass  host={host} created={this.classCreated}/>
          <List header="Classes" items={this.state.classes} click={this.classClicked}/> 
        </div>
        </div>
      </div>
    );
  }
}

export default RegistrationApp;