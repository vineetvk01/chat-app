import React from 'react';
import { DContainer, DRow, DCol } from '../components/Container';

const NotFound = () => {
  return (
    <DContainer fluid>
      <DRow>
        <DCol md={{ span: 10, offset: 1 }}>
          <h3 className="bold-heading text-center"> 404 Not Found </h3>
        </DCol>
      </DRow>
    </DContainer>
  );
};

export default NotFound;
