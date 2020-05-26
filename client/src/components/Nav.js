import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

export default class DNav extends React.Component {
  static Link = (props) => <Nav.Link {...props}/>
  static Dropdown = (props) => <NavDropdown {...props}/>
  static DropdownItem = (props) => <NavDropdown.Item {...props}/>

  render() {
    return (
      <Nav {...this.props}/>
    );
  }
}