import React, { Component } from 'react';
import './counter.css'

// Class Component
class Counter extends Component {
  render () {
    return (
      <div className="counter">
        <button onClick={increament}>+1</button>
        <span className='count'>0</span>
      </div>
    );
  }
}

function increament() {
    console.log('increament')
}

export default Counter