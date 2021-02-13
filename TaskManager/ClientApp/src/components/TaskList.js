import React, { Component } from "react";
import Task from "./Task";
import ModalForm from "./ModalForm";
import authService from './api-authorization/AuthorizeService'
import { post } from "jquery";
export class TaskList extends Component {

    state = {
        isOpen:false,
        todos: []
    };

    componentDidMount() {
        this.populateTasks();
    }

    async populateTasks() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Todos', {
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ todos: data, isOpen: false });
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    deleteToDo = (todo) => {
        const filteredItems = this.state.todos.filter(x => x.id !== todo.id);
        this.setState({
            todos: filteredItems
        });
        this.deleteOnServer(todo);
    };
    addToDo = (todo) => {
        todo.id = 0;
        this.saveToServer(todo);
        this.closeModal();
    }
    async deleteOnServer(todo) {
        const token = await authService.getAccessToken();
        fetch("api/Todos/"+todo.id, {
            method: "DELETE", 
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }).then((response) => {
            this.populateTasks();       
        });
    }
    async saveToServer(todo) {
        const token = await authService.getAccessToken();
        fetch("api/Todos", {
            method: "POST", 
            body: JSON.stringify(todo),
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }).then((response) => {
            this.populateTasks();       
        });
    }

    editToDo = (x) => {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                if (todo.id === x.id) {
                    return {
                        ...todo,
                        status: todo.status === "Done" ? "Pending" : "Done"
                    };
                } else {
                    return todo;
                }
            })
        }));
    };

    searchTask = (event) => {
        //console.log(event);
        const query = event.currentTarget.value;
        if(query === '')
        {
            this.populateTasks();
            return;
        }
        const filteredItems = this.state.todos.filter(x => x.name.toLowerCase().includes(query));
        this.setState({
            todos: filteredItems
        });
    }

    render() {
        return (
            <div>
                { this.state.isOpen ? 
                <ModalForm 
                    Title={"Add"}
                    closeModal={this.closeModal} 
                    isOpen={this.state.isOpen} 
                    handleSubmit={this.addToDo}
                    todo={{
                        id: "",
                        name: "",
                        descripition: "",
                        start: "",
                        end: "",
                        status: "Pending"
                    }}
                /> 
                : 
                null 
                }
                <h1>TodoList </h1>
                <button style={{marginBottom: '1em'}} className="btn btn-primary" onClick={this.openModal}>New Task</button>
                <input style={{marginLeft: '1em'}} type="text" id="myInput" onKeyUp={this.searchTask} placeholder="Search for Tasks.."></input>
                <div className="row">
                <div className="card-deck">
                {this.state.todos.map(x => {
                        return(<Task key={x.id} todo={x} onDelete={this.deleteToDo} onEdit={this.editToDo}/>)
                })}
                </div>
                </div>
            </div>
        );
    }
}

