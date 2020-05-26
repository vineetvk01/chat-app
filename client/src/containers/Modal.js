import React from 'react';
import { DModal } from '../components/Modal';

export const VerticalModal = (props) => {
  const { children } = props;
  return (
    <DModal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
      <DModal.Header closeButton></DModal.Header>
      <DModal.Body>
        {children}
      </DModal.Body>
    </DModal>
  )
}
