import React, { Component } from 'react';
import {ListItem} from './ListItem';

export class ToDoList extends Component {

	render() {
		let tasks = this.props.tasks.filter((val, i) => val.visible === true);

		return (
			<ul className="todo-list">
				{tasks.map(task => (
					<ListItem key={task.id} id={task.id} status={task.status} color={task.color} photo={task.photo} task={task.value} handleEnter={this.props.handleEnter} handleTaskChange={this.props.handleTaskChange} handleBlur={this.props.handleBlur} handleEdit={this.props.handleEdit} handleDestroy={this.props.handleDestroy} handleCompleted={this.props.handleCompleted}/>
				))}
			</ul>
		);
	}
}
