import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import authService from './api-authorization/AuthorizeService'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalForm from "./ModalForm";
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo:{
            id: props.todo.id,
            name: props.todo.name,
            descripition: props.todo.descripition,
            start: props.todo.start,
            end: props.todo.end,
            status: props.todo.status
        },
        isOpen:false,
        };
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    async updateOnServer(todo){
        const token = await authService.getAccessToken();
        fetch("api/Todos/"+todo.id, {
            method: "PUT", 
            body: JSON.stringify(todo),
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }).then((response) => {
        });
    }
    editToDo = (x) => {
        this.setState(state => ({
            todo: x
        }))
        this.updateOnServer(x);
        this.closeModal();
    };
    renderStatus() {
        let textColor = "";
        if(this.state.todo.status == "Done")
        {
            textColor = "text-success";
        }
        if(this.state.todo.status == "Pending")
        {
            textColor = "text-warning";
        }
        if(this.state.todo.status == "InProgress")
        {
            textColor = "text-info";
        }
        return(<span className={textColor}>{this.state.todo.status}</span>)
    }
    render() {
        return (
            <div>
        <Card id={this.state.id} style={{ maxWidth: '18rem', marginBottom: '1em' }}>
            <Card.Body>
                <Card.Title>Title: {this.state.todo.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Status: {this.renderStatus()}</Card.Subtitle>
                <Card.Text>
                    Description: {this.state.todo.descripition}
                    <br></br>
                    Start: {new Date(this.state.todo.start).toLocaleString("en-US")}
                    <br></br>
                    End: {new Date(this.state.todo.end).toLocaleString("en-US")}
                </Card.Text>
                <div className ="row">
                <Button className="btn btn-danger" onClick={() => this.props.onDelete(this.state.todo)} >
                            <span>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </span>
                </Button>
                <Button className="btn btn-info" onClick={() => this.openModal()} >
                            <span>
                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </span>
                </Button>
                { this.state.isOpen ? 
                <ModalForm 
                    Title="Edit"
                    closeModal={this.closeModal} 
                    isOpen={this.state.isOpen} 
                    handleSubmit={this.editToDo}
                    todo={this.state.todo}
                /> 
                : 
                null 
                }
                </div>
            </Card.Body>
        </Card>
        </div>
        )}
}