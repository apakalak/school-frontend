import React from 'react';
import './CreateKlass.css';
import axios from 'axios'

export default class CreateKlass extends React.Component{
    constructor(props){
        super(props);
        this.state= {};
        this.create = this.create.bind(this);
    }

    create(e){
        e.preventDefault();
        if(!(this.name && this.name.value) ||
            !(this.semester && this.semester.value) ||
            !(this.fee && this.fee.value)){
            this.setState({error : "Please enter valid data!!"})
        }
        else if(this.fee && this.fee.value < 0)
        {
            this.setState({error : "Please enter positive fee value!!"})
        }
        else if(this.semester && this.semester.value){
            if(Date.parse(this.semester.value) < Date.now()){
                this.setState({error : "Please enter valid semester date!!"})
            }
            else{
                const reqObj  ={"name": this.name.value,
                                "semester": this.semester.value,
                                "credits": this.credits.value,
                                "fee": +this.fee.value,
                                "department": this.department.value}
                axios.post(
                        this.props.host + "/klasses",reqObj
                    ).then(data => {
                        this.name.value = "";
                        this.semester.value = "";
                        this.credits.value = "1";
                        this.fee.value = "";
                        this.department.value = "SCIENCE";
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
            <div className="create-klass">
                <h1>Create Class</h1>
                <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
                <form>
                    <label htmlFor="name">Name</label>
                    <input name="name" ref={n => this.name = n} type="name"/>
                    <label htmlFor="semester">Semester</label>
                    <input name="semester" ref={n => this.semester = n} type="date" />
                    <label htmlFor="credits">Credits</label>
                    <select name="credits" ref={n => this.credits = n}  >
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option></select>
                    <label htmlFor="department">Department</label>
                   <select name="department" ref={n => this.department = n}  >
                       <option value="SCIENCE">SCIENCE</option>
                       <option value="ENGINEERING">ENGINEERING</option>
                       <option value="LITERATURE">LITERATURE</option>
                       <option value="PHILOSOPHY">PHILOSOPHY</option></select>
                    <label htmlFor="fee">Fee</label>
                    <input name="fee" ref={n => this.fee = n} type="number"/>
                    <button onClick={this.create}>Create</button>
                </form>
            </div>
        )}
}