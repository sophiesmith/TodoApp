import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';
import firebase from 'firebase';

export class Header extends Component {
  constructor(props) {
  	super(props);
    console.log("header props");
    console.log(this.props);
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
    this.updateTodo = this.updateTodo.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

   componentDidMount(){
      const {firebase, actions} = this.props
       firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log("auth'd user")
            console.log(user)
            actions.changeUser(user.uid);
          } else {
            console.log("no auth'd user")
            actions.changeUser(0);
          }
      })
    }


  	handleClearCompleted() {
  		//this.props.actions.clearCompleted();
      this.props.tasks.map((task) => {
         if (task.status === 'completed') {
            this.removeTodo(task.id);
          } 
        })
  	}

  	handleAllClick() {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
        this.updateTodo(tasks[i].id, {visible:true});
  		}
  	}

  	handleActiveClick() {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				this.updateTodo(tasks[i].id, {visible:false});
  			} else {
  				this.updateTodo(tasks[i].id, {visible:true});
  			}
  		}
  	}

  	handleCompletedClick() {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				this.updateTodo(tasks[i].id, {visible:true});
  			} else {
  				this.updateTodo(tasks[i].id, {visible:false});
  			}
  		}
  	}

  	handleToggleAll() {
  		this.props.actions.toggleAll();
      this.props.tasks.map((task) => {
          this.updateTodo(task.id, {status: this.props.toggleTo})
      })
      let items = this.props.tasks.length;
      if (this.props.toggleTo === 'completed') {
        items = 0;
      }
      this.props.actions.updateItems(items);
  	}

  	handleDestroy(id) {
      let items = this.props.itemsLeft;
      this.props.tasks.map((task) => {
          if (task.id === id) {
            if (task.status !== 'completed') {
              items--;
            } 
            this.removeTodo(task.id);
          } 
        })
      this.props.actions.updateItems(items);
    }

 /*   function middleware (store) {
      //watcher goes here
      return function (next) {
        return function (action) {


        }
      }
    }*/

  	handleCompleted(id) {
  		//this.props.actions.toggleCompleted(id);
      let items = this.props.itemsLeft;
      this.props.tasks.map((task) => {
          if (task.id === id) {
            if (task.status === 'completed') {
              items++;
              this.updateTodo(task.id, {status: ''})
            } else {
              items--;
              this.updateTodo(task.id, {status: 'completed'})
            }
          } 
        })

        this.props.actions.updateItems(items);
    }
  	

  	handleEdit(id) {
  		//this.props.actions.toggleEdit(id);
      this.props.tasks.map((task) => {
          if (task.id === id) {
            if (task.status === 'editing') {
              this.updateTodo(task.id, {status: ''})
            } else {
              this.updateTodo(task.id, {status: 'editing'})
            }
          } 
        })
  	}

  	handleTaskChange(id, e) {
  		this.props.tasks.map((task) => {
          if (task.id === id) {
              this.updateTodo(id, {value: e.target.value});
          }
        })
  	}

  	handleEnter(id, e) {
  		if (e.key === 'Enter') {
	  		this.props.tasks.map((task) => {
          if (task.id === id) {
            if (task.status === 'editing') {
              this.updateTodo(task.id, {status: ''})
            } 
          } 
      })
      }
  	}

  	handleBlur(id) {
  		this.props.tasks.map((task) => {
          if (task.id === id) {
            if (task.status === 'editing') {
              this.updateTodo(task.id, {status: ''})
            } 
          } 
      })
  	}

  	handleKeyPress(e) {
	  	if (e.key === 'Enter' && e.target.value) {
        let items = this.props.itemsLeft;
	  		this.props.actions.addTodo(e.target.value);
        this.props.actions.updateItems(items+1);
         const { firebase } = this.props;
        // Add a new todo to firebase
        firebase.push('/users/'+this.props.userId, { 
          value: e.target.value,
          status: '',
          visible: true })
	  	}
  	}

    updateTodo(id, data) {
      const { firebase } = this.props;
      firebase.update('/users/'+this.props.userId+'/'+id, data);
    }

    removeTodo(id) {
      const {firebase} = this.props;
      firebase.remove('/users/'+this.props.userId+'/'+id);
    }


  	handleChange(e) {
  		this.props.actions.changeInput(e.target.value);
  	}

    handleLogin() {
      const {firebase} = this.props;
      const credentials = {
        provider: "google",
        type: "popup"
      }
      firebase.login(credentials)
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      });
    }

    handleLogout() {
      const {firebase} = this.props;
      firebase.logout();
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
          <Footer count={this.props.itemsLeft} handleClearCompleted={this.handleClearCompleted} handleActiveClick={this.handleActiveClick} handleAllClick={this.handleAllClick} handleCompletedClick={this.handleCompletedClick}/>
          <button className="login" onClick={this.handleLogin}>Login</button>
          <button className="logout" onClick={this.handleLogout}>Logout</button>
        </div>
    	);
  	}
	}
