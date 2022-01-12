import React from 'react';
import './App.css';
import { ClassState } from './ClassState';
import { UseState } from './UseState';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name='UseState'/>
      <UseReducer name='UseReducer'/>
    </div>
  );
}

export default App;
