import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';

export class DModal extends Component {
  static Body = (props) => <ModalBody {...props} />;
  static Header = (props) => <ModalHeader {...props} />;

  render() {
    return <Modal {...this.props} />
  }
}