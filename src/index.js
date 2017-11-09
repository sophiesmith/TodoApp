import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, compose } from 'redux';
import {todoApp} from './reducers';
import {initialState} from './reducers';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

var config = {
        apiKey: "AIzaSyDc4mIKmFJ1RtiZG8_L0gSn5QGHQSJ4OLc",
        authDomain: "todo-app-1f3f9.firebaseapp.com",
        databaseURL: "https://todo-app-1f3f9.firebaseio.com",
        projectId: "todo-app-1f3f9",
        storageBucket: "",
        messagingSenderId: "123120313219"
      };

// Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(config, {enableLogging: true}),
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  todoApp
})

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer);

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
