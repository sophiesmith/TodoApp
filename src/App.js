import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from './Header';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {todoApp} from './reducers';
import {initialState} from './reducers';

let store = createStore(todoApp, initialState);

class App extends Component {
  render() {
    return (
      <div>
        <section className="todoapp">
        	<Provider store={store}>
           		<Header />
           </Provider>
        </section>
      </div>
    );
  }
}

export default App;
