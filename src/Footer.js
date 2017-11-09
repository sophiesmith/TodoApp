import React, { Component } from 'react';

export class Footer extends Component {
	render() {
		let item = 'item';
		if (this.props.count > 1) {
			item = 'items';
		}
		return (
			<footer className="footer">
		        <span className="todo-count"><strong>{this.props.count}</strong> {item} left</span>
			        <ul className="filters">
			          <li>
			            <a className="selected" href="#/" onClick={this.props.handleAllClick}>All</a>
			          </li>
			          <li>
			            <a href="#/active" onClick={this.props.handleActiveClick}>Active</a>
			          </li>
			          <li>
			            <a href="#/completed" onClick={this.props.handleCompletedClick}>Completed</a>
			          </li>
			        </ul>
		        <button className="clear-completed" onClick={this.props.handleClearCompleted}>Clear completed</button>
      		</footer>
		);
	}
}
