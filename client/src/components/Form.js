import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

export default class DForm extends Component {
    static Group = (props) => <Form.Group {...props}/>;
    static Row = (props) => <Form.Row {...props}/>;
    static Label = (props) => <Form.Label {...props}/>;
    static Control = (props) => <Form.Control {...props}/>;

    render() {
      return (
        <Form {...this.props}/>
      );
    }

}