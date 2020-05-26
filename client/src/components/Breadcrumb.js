import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default class DBreadcrumbs extends React.Component {

  static Item = (props) => <Breadcrumb.Item {...props}/>;

  render() { 
    return(
    <Breadcrumb {...this.props} />
  )}
}