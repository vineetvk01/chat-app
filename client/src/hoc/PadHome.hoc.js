import React from 'react';
import { DContainer, DRow, DCol } from '../components/Container';

const PaddedHomeLayout = (Component, {md = { span: 10, offset: 1 }} = {}) => {
  return (props) => (
  <DContainer fluid>
    <DRow>
      <DCol md={md} sm={{span:12}}>
        <Component {...props} />
      </DCol>
    </DRow>
  </DContainer>
  );
};

export default PaddedHomeLayout;