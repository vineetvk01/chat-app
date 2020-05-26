import React from 'react';
import { DContainer, DRow, DCol } from '../components/Container';

const Footer = () => {
  return (
    <DContainer fluid>
      <DRow>
        <DCol xs={{span: 12}} sm={{span: 4, offset: 4}}> 
        <p className="light-text text-center"> &#169; Copyright 2020. All rights reserved.</p>
        </DCol>
      </DRow>
    </DContainer>
  );
};

export default Footer;
