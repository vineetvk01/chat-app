import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DContainer, DRow, DCol } from '../components/Container';
import DCard from '../components/Card';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const MenuBox = styled(DCard)`
  padding: 6px;
  margin: 5px 0;
  background-color: rgba(44, 130, 201, 0.3);
  cursor: pointer; 
  &:hover {
    background-color: rgb(44, 130, 201, 0.9); 
  }
`
const MenuBody = styled(DCard.Body)`
  padding: 5px 0;
  font-weight: bold;
  text-align: center;
`


const Home = (props) => {

  const { isLoggedIn } = props.auth;

  useEffect(() => {

  }, [])

  if (!isLoggedIn) {
    return <Redirect to='/login' />
  }

  return (
    <DContainer fluid>
      {/* <DRow>
        <DCol md={6}>
          <MenuBox>
            <DCard.Link href='/'>
              <MenuBody>All Chats</MenuBody>
            </DCard.Link>
          </MenuBox>
        </DCol>
        <DCol md={6}>
          <MenuBox>
            <DCard.Link href='/settings'>
              <MenuBody>Integrations</MenuBody>
            </DCard.Link>
          </MenuBox>

        </DCol>
      </DRow> */}
      <DRow>
        <DCol md={12}>
          {props.children}
        </DCol>
      </DRow>
    </DContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authRequest: () => dispatch({}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
