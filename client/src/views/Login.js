import React, {useState, useEffect} from 'react';
import { DContainer, DRow, DCol } from '../components/Container';
import { DButton } from '../components/Button';
import DForm from '../components/Form';
import DAlert from '../components/Alert';
import {isEmail, isValidPassword} from '../utils/validator';
import { connect } from 'react-redux';
import { authRequestAction } from '../actions/authActions';
import  { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components';

const LoginBox = styled.div`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px 20px;
  min-height: 400px;
  opacity: 0.8;
`


const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({show: false});

  const { isLoggedIn, error : errorMessage } = props.auth;
  
  useEffect(()=>{
    if(errorMessage && errorMessage.error){
      setError({show: true, message: errorMessage.error});
    }
  },[errorMessage]);
  
  if(isLoggedIn){
    return <Redirect to='/' />
  }

  const handleSubmit = (event) => {
    const validEmail = isEmail(email);
    const validPassword = isValidPassword(password);

    if(!validEmail){
      setError({show:true, message:'Please enter a valid Email.'});
      return;
    }
    if(!validPassword){
      setError({show:true, message:'Please enter a valid Password.'});
      return;
    }

    setError({show: false});
    props.authRequest({email, password}); 
  };

  return (
    <DContainer fluid>
      <DRow>
        <DCol md={{ span: 4, offset: 4 }}>
          <LoginBox>
          <h5 className="bold-heading text-center">Login to access <img src={process.env.PUBLIC_URL+"/images/ico.png"} width="30px" alt="logo" /> VChat</h5>
          <hr />
          <DAlert show={error.show} variant="danger" onClose={() => setError({show: false})} dismissible>
            {error.message}
          </DAlert>
          <DForm>
            <DForm.Row>
              <DForm.Group as={DCol} md="12" controlId="email">
              <DForm.Label>Email Address</DForm.Label>
                <DForm.Control
                  required
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </DForm.Group>
              <DForm.Group as={DCol} md="12" controlId="password">
              <DForm.Label>Password</DForm.Label>
                <DForm.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </DForm.Group>
            </DForm.Row>
            <DButton variant="primary" onClick={handleSubmit} block>Login</DButton> 
            <Link to='/signup'><DButton variant="link" block> Don't have an account?  Create Account</DButton></Link>
            {/* <DButton variant="link" onClick={() => setModalShow(true)} block>Forgot Password ?</DButton> */}
          </DForm>
          <hr />
          </LoginBox>
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
    authRequest: (user) => dispatch(authRequestAction(user)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
