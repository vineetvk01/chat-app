import React from 'react';
import DNavbar from '../components/Navbar';
import DNav from '../components/Nav';
import { connect } from 'react-redux';
import { logoutRequestAction } from '../actions/authActions';
import styled from 'styled-components';

const Avatar = styled.span`
  border: 1px solid #000;
  padding: 8px;
  border-radius: 50%;
  font-weight: bold;
`;

const LoginButton = () => <DNav.Link href="/login"> <b>Login</b> </DNav.Link>

const DisplayPicture = <Avatar>VS</Avatar>

const ProfileButton = ({user, logout}) => (
  <DNav.Dropdown title={DisplayPicture}>  
    <DNav.DropdownItem onClick={(e) => logout()} ><b>Logout </b></DNav.DropdownItem>
  </DNav.Dropdown>
);
    
  

const Navigation = (props) => {
  const { isLoggedIn } = props.auth;
  
  return (
    <DNavbar expand='lg' variant='light' bg='light'>
      <DNavbar.Brand href="/"><img height='40px' src={`${process.env.PUBLIC_URL}/images/ico.png`} alt="app-logo" /> <b>VChat</b></DNavbar.Brand>
      <DNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <DNavbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <DNav>
          {isLoggedIn ? <ProfileButton user={props.auth.user} logout={props.logoutUser} /> : <LoginButton />}
        </DNav>
      </DNavbar.Collapse>
    </DNavbar>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutRequestAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
