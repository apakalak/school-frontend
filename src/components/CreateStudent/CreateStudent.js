import React from 'react';
import './CreateStudent.css';
import axios from 'axios'

export default class CreateStudent extends React.Component{
    constructor(props){
        super(props);
        this.state= {};
        this.create = this.create.bind(this);
    }

    create(e){
        e.preventDefault();
        if(this.email){
            if(this.email.value.length < 3){
                this.setState({error : "Email length should be greater than 3!"})
            }
            else{
                axios.post(
                    this.props.host + "/students",{"email" : this.email.value}
                ).then(data => {
                    this.email.value = "";
                    this.props.created(data.data);
                    this.setState({error : ""})
                }).catch(error => {
                    this.setState({error: error.message})
                })
            }
        }
    }

    render(){
        return (
            <div className="create-student">
                <h1>Create Student</h1>
                <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
                <form>
                    <label htmlFor="email">Email Address</label>
                    <input name="email" ref={n => this.email = n} type="email"/>
                    <button onClick={this.create}>Create</button>
                </form>
            </div>
        )}
}