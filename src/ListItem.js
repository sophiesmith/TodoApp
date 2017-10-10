import React, { Component } from 'react';


export class ListItem extends Component {

	handleEdit(task) {
		this.props.handleEdit(task);
	}

	handleDestroy(task) {
		this.props.handleDestroy(task);
	}

  	handleBlur(task) {
  		this.props.handleBlur(task);
  	}

  	handleCompleted(task) {
  		this.props.handleCompleted(task);
  	}

  	handleTaskChange(task, e) {
  		this.props.handleTaskChange(task, e);
  	}

  	handleEnter(task, e) {
  		this.props.handleEnter(task, e);
  	}

	render() {
		let checked = this.props.status;
		if (checked === 'completed') {
			checked = 'checked'; 
		} else {
			checked = '';
		}
		return (
			<li className={this.props.status} style={this.props.styles}>
				<div className="view">
	              <input className="toggle" type="checkbox" checked={checked} onClick={this.handleCompleted.bind(this, this.props.task)}/>
	              <label onDoubleClick={this.handleEdit.bind(this, this.props.task)}>{this.props.task}</label>
	              <button className="destroy" onClick={this.handleDestroy.bind(this, this.props.task)}></button>
	            </div>
	            <input className="edit" value={this.props.task} onKeyPress={this.handleEnter.bind(this, this.props.task)} onChange={this.handleTaskChange.bind(this, this.props.task)} onBlur={this.handleBlur.bind(this, this.props.task)}/>
			</li>
		);
	}
}
