import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from './Header';

class App extends Component {
  render() {
    return (
      <div>
        <section className="todoapp">
           <Header />
        </section>
      </div>
    );
  }
}

export default App;
