import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';
import { connect } from 'react-redux';
import * as todoActions from './actions';
import { bindActionCreators } from 'redux';

export class Header extends Component {
  constructor(props) {
  	super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleActiveClick = this.handleActiveClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleCompletedClick = this.handleCompletedClick.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

  }

  	handleClearCompleted() {
  		this.props.actions.clearCompleted();
  	}

  	handleAllClick() {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
        this.props.actions.setVisibility(tasks[i].id, true);
  		}
  	}

  	handleActiveClick() {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				this.props.actions.setVisibility(tasks[i].id, false);
  			} else {
  				this.props.actions.setVisibility(tasks[i].id, true);
  			}
  		}
  	}

  	handleCompletedClick() {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				this.props.actions.setVisibility(tasks[i].id, true);
  			} else {
  				this.props.actions.setVisibility(tasks[i].id, false);
  			}
  		}
  	}

  	handleToggleAll() {
  		this.props.actions.toggleAll();
  	}

  	handleDestroy(id) {
  	  this.props.actions.removeTodo(id);   	
    }

  	handleCompleted(id) {
  		this.props.actions.toggleCompleted(id);
  	}

  	handleEdit(id) {
  		this.props.actions.toggleEdit(id);
  	}

  	handleTaskChange(id, e) {
  		this.props.actions.changeTask(id, e.target.value);
  	}

  	handleEnter(id, e) {
  		if (e.key === 'Enter') {
	  		this.props.actions.toggleEdit(id);
      }
  	}

  	handleBlur(id) {
  		this.props.actions.toggleEdit(id);
  	}

  	handleKeyPress(e) {
	  	if (e.key === 'Enter' && e.target.value) {
	  		this.props.actions.addTodo(e.target.value);
	  	}
  	}

  	handleChange(e) {
  		this.props.actions.changeInput(e.target.value);
  	}

  

  	render() {
  		return (
  			<div>
		    	<header className="header">
		      	<h1>todos</h1>
		      	<input className="new-todo" value={this.props.value} placeholder="What needs to be done?" 
		      	onKeyPress={this.handleKeyPress} onChange={this.handleChange} autoFocus />
		    	</header>
		    	<Main tasks={this.props.tasks} handleEnter={this.handleEnter} handleToggleAll={this.handleToggleAll} handleTaskChange={this.handleTaskChange} handleBlur={this.handleBlur} handleEdit={this.handleEdit} handleDestroy={this.handleDestroy} handleCompleted={this.handleCompleted}/>
		    	<Footer count={this.itemsLeft} handleClearCompleted={this.handleClearCompleted} handleActiveClick={this.handleActiveClick} handleAllClick={this.handleAllClick} handleCompletedClick={this.handleCompletedClick}/>
    		</div>
    	);
  	}
	}

function mapStateToProps (state) {
  return {
    tasks: state.tasks,
    value: state.value,
    itemsLeft: state.itemsLeft,
    currId: state.currId
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)