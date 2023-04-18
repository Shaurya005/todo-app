import React, { Component } from 'react';

export default class FirstComponent extends Component {
    render() {
      return (
        <div className="firstComponent">
          First Component
        </div>
      );
    }
  }

export class SecondComponent extends Component {
    render() {
      return (
        <div className="firstComponent">
          Second Component
        </div>
      );
    }
  }