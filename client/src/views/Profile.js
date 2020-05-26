import React from 'react';
import { DContainer, DRow, DCol } from '../components/Container';
//import { DButton } from '../components/Button';

const Profile = () => {
  return (
    <DContainer fluid>
      <DRow>
        <DCol md={{ span: 4, offset: 4 }}>
          <p id="built-with-love" className="text-center"> Profile </p>
        </DCol>
      </DRow>
      <br />
    </DContainer>
  );
};

export default Profile;
