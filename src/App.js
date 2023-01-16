import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent, {SecondComponent} from './components/learning-examples/FirstComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';

import './App.css';
import './bootstrap.css';
 

// A class component extends a React class called Component.
// When I create a component extending the react class Component, we need to define the render method in it.
class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp />
        {/* <Counter /> */}
        {/* Actually the CounterButton is being used as Counter, and that is what is being shown on the page when we have CounterButton as default export from Counter.jsx */}
      </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="learningComponents">
        My Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}

export default App;