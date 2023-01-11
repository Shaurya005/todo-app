import React, { Component } from 'react';

// Class Component
export default class FirstComponent extends Component {
    render() {
      return (
        <div className="firstComponent">
          First Component
        </div>
      );
    }
  }

// Class Component
export class SecondComponent extends Component {
    render() {
      return (
        <div className="firstComponent">
          Second Component
        </div>
      );
    }
  }

// function SecondComponent() {
//     return (
//       <div className="firstComponent">
//         Second Component
//       </div>
//     );
// }