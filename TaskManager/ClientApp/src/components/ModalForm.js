import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import AddTask from "./AddTask";

export default class ModalForm extends Component {

  state={ name: null }

  handleChange = (e) => this.setState({name: e.target.value})

  render(){
    return(
      <Modal 
        show={this.props.isOpen} 
        onHide={this.props.closeModal}
      >
      <Modal.Header closeButton>
        <Modal.Title>{this.props.Title} Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <AddTask 
        Title={this.props.Title}
        todo={this.props.todo}
        onAdd={this.props.handleSubmit}>
      </AddTask>      
      </Modal.Body>
    </Modal>
    )
  }
}