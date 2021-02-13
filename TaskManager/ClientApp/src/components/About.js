import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class About extends Component {
  static displayName = About.name;

  render () {
    return (
      <div>
        <h1>Task Manager</h1>
          <h5>
          Task Manager is one of the best task management tools created for individuals and teams. With its simplified, user-friendly GUI letting you navigate a powerful set of features, Todo List stands out of the crowd when it comes to helping with task completion.
          </h5>
          <h4>Contact Us on: Support@TaskManager.com.</h4>
      </div>
    );
  }
}
