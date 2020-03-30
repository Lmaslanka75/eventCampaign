import React from 'react';
import logo from './logo.svg';
import './App.css';
import Events from './components/Events';
import Maps from './components/Maps'

function App() {

  return (
    <div className="App">
      <Maps />
      <Events />
    </div>
  );
}

export default App;
