import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AreaChart from './components/AreaChart';
import BarChart from './components/BarChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BarChart width={400} height={400}/>
      </div>
    );
  }
}

export default App;
