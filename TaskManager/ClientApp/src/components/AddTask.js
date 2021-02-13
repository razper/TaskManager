import React, { Component } from "react";
import { Calender } from "./Calender";
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.todo.id,
            name: props.todo.name,
            descripition: props.todo.descripition,
            start: props.todo.start,
            end: props.todo.end,
            status: props.todo.status
        };
    }

    handleIdChange = (event) => {
        //console.log(event.target.value);
        this.setState({
            id: event.target.value
        });
    };
    handleTitleChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    handleDescriptionChange = (event) => {
        this.setState({
            descripition: event.target.value
        });
    }
    handleStatusChange = (event) => {
        this.setState({
            status: event.target.value
        });
    };
    handleStartChange = (event) => {
        this.setState({
            start: event
        });
    };
    handleEndChange = (event) => {
        this.setState({
            end: event
        });
    };
    handleToDoSubmit = (event) => {
        event.preventDefault();
        this.props.onAdd({
            id: this.state.id,
            name: this.state.name,
            descripition: this.state.descripition,
            start: this.state.start,
            end: this.state.end,
            status: this.state.status
        });
        this.setState({
            id: "",
            name: "",
            description: "",
            start: "",
            end: "",
            status: "Pending"
        });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleToDoSubmit} >
                    <div className="form-group" >
                        <input value={this.state.name} onChange={this.handleTitleChange} className="form-control" placeholder="Enter Title" required/>
                    </div>
                    <div className="form-group" >
                        <input value={this.state.descripition} onChange={this.handleDescriptionChange} className="form-control" placeholder="Enter Description" />
                    </div>
                    <div className="form-group" >
                        <Calender defaultDate={this.state.start} onChange={this.handleStartChange}></Calender>
                    </div>
                    <div className="form-group" >
                        <Calender defaultDate={this.state.end} onChange={this.handleEndChange}></Calender>
                    </div>
                    <div className="form-group">
                        <select value={this.state.status} onChange={this.handleStatusChange} className="form-control" >
                            <option value="Pending" >Pending</option>
                            <option value="InProgress" >InProgress</option>
                            <option value="Done" >Done</option>
                        </select>
                    </div>
                    <button type="submit" className="form-control btn btn-primary" >{this.props.Title} Task</button>
                </form>
            </div>
        );
    }
}