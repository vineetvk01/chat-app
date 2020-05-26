import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class DNavbar extends React.Component {
  static Brand = (props) => <Navbar.Brand {...props}/>
  static Toggle = (props) => <Navbar.Toggle {...props}/>
  static Collapse = (props) => <Navbar.Collapse {...props}/>

  render() {
    return (
      <Navbar {...this.props}/>
    );
  }
}