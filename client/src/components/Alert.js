import Alert from 'react-bootstrap/Alert';
import React, { Component } from 'react';

export default class DAlert extends Component{
  render(){
    return <Alert {...this.props}/>
  }
}