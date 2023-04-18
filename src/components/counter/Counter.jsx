import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './counter.css'

class Counter extends Component {
  constructor() {
    super()
      this.state = {
        counter : 0
      }

      this.increament = this.increament.bind(this);
      this.decrement = this.decrement.bind(this);
      this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div className="Counter">
        <CounterButton by={1} increamentMethod={this.increament} decrementMethod={this.decrement}/>
        <CounterButton by={5} increamentMethod={this.increament} decrementMethod={this.decrement}/>
        <CounterButton by={10} increamentMethod={this.increament} decrementMethod={this.decrement}/>
        <CounterButton />
        <span className='count'>{this.state.counter}</span>
        <div>
          <button className='reset' onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }

  reset() {
    this.setState(
      {counter: 0}
    )
  }

  increament (by) { 
    this.setState(
      (prevStat) => {
      return {counter: prevStat.counter + by}
      }
    );
    console.log(`increament from child in parent - ${by}`)
  }

  decrement (by) {
    this.setState(
      (prevStat) => {
      return {counter: prevStat.counter - by}
    }
    );
    console.log(`decrement from child in parent - ${by}`)
  }
}

class CounterButton extends Component 
{
  render () {
    const style = {fontSize : "50px", padding: "15px 30px"};
    return (
      <div className="counter">
        <button onClick={() => this.props.increamentMethod(this.props.by)}>+ {this.props.by}</button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>- {this.props.by}</button> 
      </div>
    );
  }
}

function increament() {
     console.log('increment');
}

CounterButton.defaultProps = {
  by : 1
}

CounterButton.propType = {
  by : PropTypes.number
}

export default Counter