import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './counter.css'

/*
So rather than have the App create the CounterButtons, I would want to have the Counter create the Counter Buttons.
*/
class Counter extends Component {
  render() {
    return (
      <div className="Counter">
        {/* <Counter by="1"/> 
        The only way you can actually assign integer value is creating a JSX expression. So surround numbers with curly braces.*/}

        <CounterButton by={1}/>
        <CounterButton by={5}/>
        <CounterButton by={10}/>
        <CounterButton />
        {/* All these 3 counters will have their own individual counter states. 
        One of the important things that you'd need to understand is the incremental value is not going to change.

        So once I create this button and I say this is increment value is 5, the increment value will remain 5 throughout.
        It will not change to something else during the lifetime of that specific component.
        And that's where properties comes in... or they're called props.

        What you can do is to <Counter />, you can add a property. The way you can do that is by saying <Counter by = "1" />.
        I can go to the Counter component and I can use this prop value to increment by value.

        It's a javascript value, and the way you can use the props is using this.props.by, and see what would happen +1, +5, +10.

        should be. How much the increment should be does not change over the lifetime of this component. These components will always 
        increment by 10, by 5, by 1, etc. And that's the reason why we made it a property and we are using it to set the increment value of that specific component.
        */}
      </div>
    );
  }
}

// Class Component
class CounterButton extends Component {

  /*
  One of the important things in React is, whenever you would want your component to have state, the best practices to follow are there.
  Number one is, define the initial state in a constructor. So in a constructor is where you would actually define your initial state.

  The syntax for a constructor in Javascript is very simple. It's constructor(). 
  So in Java we would use actually the class name as the method name but in Javascript its constructor(){}

  In JavaScript unless you call this super() method, you cannot use this.
  So in the constructor before I use this, I would need to call this super() method.
  */
  // Define the initial state for this component in a constructor
  constructor() {
	super() // Always needed
    this.state = { // Defining the initial state in constructor
      counter : 0 // you can define a javascript object in here.
    }

	// this.increament = this.increament.bind(this); This is how we bind the class inside the constructor.

  // For typical React ES6 classes, if you want to make "this" available inside the local method of class, we need to bind the method to the class.
  // But this method binding can be avoided if we use arrow method and not normally defined method
  // So when you use an arrow function, you don't really need to bind this variable, because this binding happens automatically.

  }
  render () {
    const style = {fontSize : "50px", padding: "15px 30px"};
    return (
      <div className="counter">
        {/* <button onClick={increament()}>+1</button> Here it's actually calling the function on the first tiime page loads so we need to just pass the function reference without (). */}
        {/* <button onClick={increament}>+1</button> */}
        <button onClick={this.increament}>+ {this.props.by}</button> {/*As we want to call increament method of Counter class and not global method, so we need to use this.increment for its method reference. */}
        <span className='count'
        style= {{fontSize : "50px", padding: "15px 30px"}}>{/* We need to pass javascript object here, it cannot be simple string and inside javascript object, we can not have hyphen. */}
        {/* style= {style}> We can also define a variable for this styling above and use it for inline css styling.*/ }
          {this.state.counter}</span>
        {/* For mentioning javascript variable or method in between JSX html, we need to mention it inside parenthesis */}
      </div>
    );
  }

 increament = () => { // Made it as lamda function to avoid binding method to class.
  // If we do directly this.state.counter++ here instead of using setState method, we'll have warning - "Do not mutate state directly. Use setState()"

  /*
   In React, You don't update the state of the component directly, you need to call a setState method and tell React - hey there!
   I'm going to update the state now. Whatever update is there, you go and take it, and apply it to the component.
   One of the important things about this.setState is that what you need to pass to it, is an object. Object may be a new one or an existing with updated value.
  */
	this.setState({
		counter: this.state.counter + this.props.by
	}); 
  /*  
  When we call this.setState, what it does is a merge with the current state

  setState is a merge, so whatever values you pass to the setState is merged with the existing state.
  */
    console.log('increament')
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

//  Earlier we made the mistake of actually assigning by = "1".

// And we saw that the counter component continued to work without giving a warning.

// The way we can avoid that is by doing a type check on the prop value which is being passed.

// It's another property. So you can say counter.propTypes and define another javascript object by. So now if we give string value to "by" from <Counter /> then it'll throw warning on console.
// We saw that both defaultProps and PropTypes in the React ES6 are added as properties on the class.

CounterButton.propType = {
  by : PropTypes.number
}

export default Counter