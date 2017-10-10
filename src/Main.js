import React, { Component } from 'react';
import {ToDoList} from './ToDoList';

export class Main extends Component {
  render() {
    return (
      <div>
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label for="toggle-all" onClick={this.props.handleToggleAll}>Mark all as complete </label>
        <ToDoList tasks={this.props.tasks} handleEnter={this.props.handleEnter} handleTaskChange={this.props.handleTaskChange} handleBlur={this.props.handleBlur} handleEdit={this.props.handleEdit} handleDestroy={this.props.handleDestroy} handleCompleted={this.props.handleCompleted}/>
      </div>

    );
  }
}
