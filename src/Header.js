import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";

export class Header extends Component {
  constructor(props) {
  	super(props);

    const {firebase, actions} = this.props;
       firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            actions.changeUser(user.uid);
          } else {
            actions.changeUser(0);
          }
      })
  }



  	handleClearCompleted = () => {
      this.props.tasks.map((task) => {
         if (task.status === 'completed') {
            this.removeTodo(task.id);
          } 
        })
  	}

  	handleAllClick = () => {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
        this.updateTodo(tasks[i].id, {visible:true});
  		}
  	}

  	handleActiveClick = () => {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				this.updateTodo(tasks[i].id, {visible:false});
  			} else {
  				this.updateTodo(tasks[i].id, {visible:true});
  			}
  		}
  	}

  	handleCompletedClick = () => {
  		const tasks = this.props.tasks;
  		for (let i=0; i<tasks.length; i++) {
  			if (tasks[i].status === 'completed') {
  				this.updateTodo(tasks[i].id, {visible:true});
  			} else {
  				this.updateTodo(tasks[i].id, {visible:false});
  			}
  		}
  	}

  	handleToggleAll = () => {
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

  	handleDestroy = (id) => {
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

  	handleCompleted = (id) => {
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
  	

  	handleEdit = (id) => {
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

  	handleTaskChange = (id, e) => {
  		this.props.tasks.map((task) => {
          if (task.id === id) {
              this.updateTodo(id, {value: e.target.value});
          }
        })
  	}

  	handleEnter = (id, e) => {
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

  	handleBlur = (id) => {
  		this.props.tasks.map((task) => {
          if (task.id === id) {
            if (task.status === 'editing') {
              this.updateTodo(task.id, {status: ''})
            } 
          } 
      })
  	}

  	handleKeyPress = (e) => {
	  	if (e.key === 'Enter' && (e.target.value || this.props.photoUrl)) {
        let items = this.props.itemsLeft;
	  		this.props.actions.addTodo(e.target.value);
        this.props.actions.updateItems(items+1);
         const { firebase } = this.props;
        // Add a new todo to firebase
        firebase.push('/users/'+this.props.userId, { 
          value: e.target.value,
          status: '',
          color: this.props.color,
          photo: this.props.photoUrl,
          visible: true })

	  	}
  	}

    updateTodo = (id, data) => {
      const { firebase } = this.props;
      firebase.update('/users/'+this.props.userId+'/'+id, data);
    }

    removeTodo = (id) => {
      const {firebase} = this.props;
      firebase.remove('/users/'+this.props.userId+'/'+id);
    }


  	handleChange = (e) => {
  		this.props.actions.changeInput(e.target.value);
  	}

    handleLogin = () => {
      const {firebase} = this.props;
      const credentials = {
        provider: "google",
        type: "popup"
      }
      firebase.login(credentials);
    }

    handleLogout = () => {
      const {firebase} = this.props;
      firebase.logout();
      window.location.reload();
    }

    handleColorChange = (e) => {
      this.props.actions.changeColor(e.target.value);
    }

    handleUrl = (e) => {
      this.props.actions.changePhoto('', e.target.value);
    }


    handleUploadSuccess = filename => {
      const {firebase} = this.props;
      firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(
          url => this.props.actions.changePhoto(filename, url)
          );
    }

    handleClearPhoto = () => {
      this.props.actions.changePhoto('', '');
    }

  

  	render() {
      const {firebase} = this.props;
  		return (
  			<div>
		    	<header className="header">
		      	<h1>todos</h1>
		      	<input className="new-todo" style={{color: this.props.color}} value={this.props.value} placeholder="What needs to be done?" 
		      	onKeyPress={this.handleKeyPress} onChange={this.handleChange} autoFocus />
            <img src={this.props.photoUrl} className="preview" alt=""/>
            <input type='color' className='color' onChange={this.handleColorChange}/>
            <FileUploader
            accept="image/*"
            name="pic"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadSuccess={this.handleUploadSuccess} />
            <input className="clear" type="button" value="Clear photo" onClick={this.handleClearPhoto}/>
            <div className="url">Or enter a URL:<input type="text" onChange={this.handleUrl}/></div>
		    	</header>
		    	<Main tasks={this.props.tasks} handleEnter={this.handleEnter} handleToggleAll={this.handleToggleAll} handleTaskChange={this.handleTaskChange} handleBlur={this.handleBlur} handleEdit={this.handleEdit} handleDestroy={this.handleDestroy} handleCompleted={this.handleCompleted}/>
          <Footer count={this.props.itemsLeft} handleClearCompleted={this.handleClearCompleted} handleActiveClick={this.handleActiveClick} handleAllClick={this.handleAllClick} handleCompletedClick={this.handleCompletedClick}/>
          <button className="login" onClick={this.handleLogin}>Login</button>
          <button className="logout" onClick={this.handleLogout}>Logout</button>
        </div>
    	);
  	}
	}
