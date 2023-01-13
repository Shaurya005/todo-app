import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './counter.css'

/*
So rather than have the App create the CounterButtons, I would want to have the Counter create the Counter Buttons.
*/
class Counter extends Component {
  constructor() {
    super() // Always needed
      this.state = { // Defining the initial state in constructor
        counter : 0 // you can define a javascript object in here.
      }

      this.increament = this.increament.bind(this);
      this.decrement = this.decrement.bind(this);
      this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div className="Counter">
        {/* <Counter by="1"/> 
        The only way you can actually assign integer value is creating a JSX expression. So surround numbers with curly braces.*/}

        <CounterButton by={1} increamentMethod={this.increament} decrementMethod={this.decrement}/>
        <CounterButton by={5} increamentMethod={this.increament} decrementMethod={this.decrement}/>
        <CounterButton by={10} increamentMethod={this.increament} decrementMethod={this.decrement}/>
        <CounterButton />
        <span className='count'>{this.state.counter}</span>
        <div>
          <button className='reset' onClick={this.reset}>Reset</button>
        </div>
        {/* All these 3 counters will have their own individual counter states. 
        One of the important things that you'd need to understand is the incremental value is not going to change.

        So once I create this button and I say this is increment value is 5, the increment value will remain 5 throughout.
        It will not change to something else during the lifetime of that specific component.
        And that's where properties comes in... or they're called props.

        What you can do is to <Counter />, you can add a property. The way you can do that is by saying <Counter by = "1" />.
        I can go to the Counter component and I can use this prop value to increment by  value.

        It's a javascript value, and the way you can use the props is using this.props.by, and see what would happen +1, +5, +10.

        should be. How much the increment should be does not change over the lifetime of this component. These components will always 
        increment by 10, by 5, by 1, etc. And that's the reason why we made it a property and we are using it to set the increment value of that specific component.
        */}
      </div>
    );
  }

  reset() {
    this.setState(
      {counter: 0}
    )
  }

  increament (by) { 
    // we'll look at an important tip regarding accessing previous state. Instead of defining the normal function, the best practice is to define arrow function.
    // So all that I have done until now is actually formatted it.
    // So we are passing an arrow function, and the arrow function takes previous state as the parameter, and it gets the counter value from the previous state. 
    // The reason this is easier to read is when we do an increment we are taking the previous state counter, and incrementing it by by. 
    // And that would be the new value for the count. So this is kind of a simpler method to read , than this.state.counter.
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

// Class Component
class CounterButton extends Component 
{
  render () {
    const style = {fontSize : "50px", padding: "15px 30px"};
    return (
      <div className="counter">
        {/* <button onClick={increament()}>+1</button> Here it's actually calling the function on the first tiime page loads so we need to just pass the function reference without (). */}
        {/* <button onClick={increament}>+1</button> */}
        <button onClick={() => this.props.increamentMethod(this.props.by)}>+ {this.props.by}</button> {/*As we want to call increament method of Counter class and not global method, so we need to use this.increment for its method reference. */}
        {/* <button onClick={this.props.decrementMethod(this.props.by)}>- {this.props.by}</button> Passing params like this will not be working here.*/}
        <button onClick={() => this.props.decrementMethod(this.props.by)}>- {this.props.by}</button> 
        {/*<span className='count'
        style= {{fontSize : "50px", padding: "15px 30px"}}> We need to pass javascript object here, it cannot be simple string and inside javascript object, we can not have hyphen. */}
        {/* style= {style}> We can also define a variable for this styling above and use it for inline css styling.
          {this.state.counter}</span> */}
        {/* For mentioning javascript variable or method in between JSX html, we need to mention it inside parenthesis */}
      </div>
    );
  }
}

function increament() {
     console.log('increment');
}

// You can actually set a default value for the properties, as well as you can check the type of properties.
// For example let's say for the counter I would want to make 1 the default value.
// So if somebody does not set by at all, the default I would want to give for it is 1. The way you can do that is by going outside the counter class.

// This is kind of a JSX work around provided by React. So the way you can do that is defining a property on the counter. 
// So you can say counter.defaultProps and create a javascript object in here. We can add many more stuffs there.
CounterButton.defaultProps = {
  by : 1
}

// Earlier we made the mistake of actually assigning by = "1". And we saw that the counter component continued to work without giving a warning.
// The way we can avoid that is by doing a type check on the prop value which is being passed. It's another property. 
// So you can say counter.propTypes and define another javascript object by. So now if we give string value to "by" from <Counter /> then it'll throw warning on console.
// We saw that both defaultProps and PropTypes in the React ES6 are added as properties on the class.

CounterButton.propType = {
  by : PropTypes.number
}

export default Counter