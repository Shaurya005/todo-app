import React, { Component } from 'react';
import FirstComponent, {SecondComponent} from './components/learning-examples/FirstComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import TodoApp from './components/todo/TodoApp';

import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp />
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