import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';

export class Header extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		tasks: [],
  		value: '', 
  		toggleTo: 'completed',
  		itemsLeft: 0,
  		currId: -1
  	};

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
  		const tasks = this.state.tasks.slice();
  		const newTasks = tasks.filter((val, i) => tasks[i].status !== 'completed');
  		this.setState({tasks: newTasks});
  	}

  	handleAllClick() {
  		const tasks = this.state.tasks.slice();
  		for (let i=0; i<tasks.length; i++) {
  			tasks[i].visible = true;
  		}
  		this.setState({tasks: tasks});
  	}

  	handleActiveClick() {
  		const tasks = this.state.tasks.slice();
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				tasks[i].visible = false;
  			} else {
  				tasks[i].visible = true;
  			}
  		}
  		this.setState({tasks: tasks});
  	}

  	handleCompletedClick() {
  		const tasks = this.state.tasks.slice();
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				tasks[i].visible = true;
  			} else {
  				tasks[i].visible = false;
  			}
  		}
  		this.setState({tasks: tasks});
  	}

	handleToggleAll() {
		const tasks = this.state.tasks.slice();
		let toggleTo = '';

		for (let i=0; i<tasks.length; i++) {
  				tasks[i].status = this.state.toggleTo;
  			}
  		if (this.state.toggleTo === '') {
  			toggleTo = 'completed';
  		} 
  		this.setState({
  			tasks: tasks,
  			toggleTo: toggleTo,
  		})
	}

	handleDestroy(task) {
		const tasks = this.state.tasks.slice();
		let index = 0;
		for (let i=0; i<tasks.length; i++) {
			if (tasks[i].value === task) {
				index = i;
				break;
			}
		}
		
		let itemsLeft = this.state.itemsLeft;
		if (tasks[index].status !== 'completed') {
			itemsLeft--;
		}

		tasks.splice(index, 1);
  	 this.setState({
          tasks: tasks,
          itemsLeft: itemsLeft
      });
  	}

  	handleCompleted(task) {
  		const tasks = this.state.tasks.slice();
		let itemsLeft = this.state.itemsLeft;
	
  		const i = tasks.findIndex((val, j) => tasks[j].value === task);
  		if (tasks[i].status === 'completed') {
  			tasks[i].status = '';
  			itemsLeft++;
  		} else {
  			tasks[i].status = 'completed';
  			itemsLeft--;
  		}	    

  		this.setState({tasks: tasks, itemsLeft: itemsLeft});
  	}

  	handleEdit(task) {
  		const tasks = this.state.tasks.slice();

  		const i = tasks.findIndex((val, j) => tasks[j].value === task);
  		if (tasks[i].status !== 'completed') {
  			tasks[i].status = 'editing';
  		}

  		this.setState({tasks: tasks});

  	}

  	handleTaskChange(task, e) {
  		const tasks = this.state.tasks.slice();
  		const i = tasks.findIndex((val, j) => tasks[j].value === task);
  		tasks[i].value = e.target.value;

  	  	this.setState({tasks: tasks});
  	}

  	handleEnter(task, e) {
  		if (e.key === 'Enter') {
	  		const tasks = this.state.tasks.slice();
	  		const i = tasks.findIndex((val, j) => tasks[j].value === task);
	  		tasks[i].status = '';

	  	  	this.setState({tasks: tasks});
  	  	}
  	}

  	handleBlur(task) {
  		const tasks = this.state.tasks.slice();

  		const i = tasks.findIndex((val, j) => tasks[j].value === task);
  		tasks[i].status = '';

  		this.setState({tasks: tasks});

  	}

  	handleKeyPress(e) {
	  	if (e.key === 'Enter' && e.target.value) {
	  		let id = this.state.currId;
	  		id++;
	  		

			let itemsLeft = this.state.itemsLeft;
			itemsLeft++;

	  		this.setState({
	  			tasks: this.state.tasks.concat({id: id, value: e.target.value, status: '', visible: true}),
	  			value: '',
	  			itemsLeft: itemsLeft,
	  			currId: id
	  		})

	  	}
  	}

  	handleChange(e) {
  		this.setState({value: e.target.value});
  	}

  

  	render() {
  		return (
  			<div>
		    	<header className="header">
		      	<h1>todos</h1>
		      	<input className="new-todo" value={this.state.value} placeholder="What needs to be done?" 
		      	onKeyPress={this.handleKeyPress} onChange={this.handleChange} autoFocus />
		    	</header>
		    	<Main tasks={this.state.tasks} handleEnter={this.handleEnter} handleToggleAll={this.handleToggleAll} handleTaskChange={this.handleTaskChange} handleBlur={this.handleBlur} handleEdit={this.handleEdit} handleDestroy={this.handleDestroy} handleCompleted={this.handleCompleted}/>
		    	<Footer count={this.state.itemsLeft} handleClearCompleted={this.handleClearCompleted} handleActiveClick={this.handleActiveClick} handleAllClick={this.handleAllClick} handleCompletedClick={this.handleCompletedClick}/>
    		</div>
    	);
  	}
	}