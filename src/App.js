import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './HeaderContainer';

class App extends Component {
  render() {
    return (
      <div>
        <section className="todoapp">
           	<HeaderContainer />
        </section>
      </div>
    );
  }
}

export default App;
