import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DContainer, DRow, DCol } from '../components/Container';
import { DButton } from '../components/Button';
import DForm from '../components/Form';
import DAlert from '../components/Alert';
import { connect } from 'react-redux';
import { validateNewUser } from '../utils/validator';
import { signupAction } from '../actions/authActions';
import { testUser } from '../constants';
import  { Link } from 'react-router-dom'

const SignupBox = styled.div`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px 20px;
  min-height: 400px;
  opacity: 0.8;
`

const Signup = ({signupRequest, auth}) => {

  const [ user, setUser ] = useState(testUser);

  const [ error, setError ] = useState({show:false});

  useEffect(() => {
    if(auth.signupError && auth.signupError.error){
      setError({show:true, message: auth.signupError.error })
    }
  },[auth]);

  const setFirstName = (firstName) => {
    const userCopy = {...user};
    userCopy.firstName = firstName;
    setUser(userCopy)
  }
  const setLastName = (lastName) => {
    const userCopy = {...user};
    userCopy.lastName = lastName;
    setUser(userCopy)
  }
  const setEmail = (email) => {
    const userCopy = {...user};
    userCopy.email = email;
    setUser(userCopy)
  }
  const setPassword = (password) => {
    const userCopy = {...user};
    userCopy.password = password;
    setUser(userCopy)
  }
  const setConfirmPassword = (confirmPassword) => {
    const userCopy = {...user};
    userCopy.confirmPassword = confirmPassword;
    setUser(userCopy)
  }
  const setPhone = (phone) => {
    const userCopy = {...user};
    userCopy.phone = phone;
    setUser(userCopy)
  }

  const handleSubmit = () => {
    const isFine = validateNewUser(user);
    if(isFine.error != null){
      setError({show:true, message: isFine.error })
    }else if(isFine){
      signupRequest(user);
    }
  }

  return (
    <DContainer fluid>
      <DRow>
        <DCol md={{ span: 6, offset: 3 }}>
          <SignupBox>
          <h5 className="bold-heading text-center">Signup to access <img src={process.env.PUBLIC_URL+"/images/ico.png"} width="30px" alt="logo" /> VChat</h5>
          <hr />
          <DAlert show={error.show} variant="danger" onClose={() => setError({show: false})} dismissible>
            {error.message}
          </DAlert>
          <DForm>
            <DForm.Row>
              <DForm.Group as={DCol} md="6" controlId="first-name">
                <DForm.Label>First Name</DForm.Label>
                <DForm.Control
                  required
                  type="text"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </DForm.Group>
              <DForm.Group as={DCol} md="6" controlId="last-name">
                <DForm.Label>Last Name</DForm.Label>
                <DForm.Control
                  required
                  type="text"
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </DForm.Group>
              <DForm.Group as={DCol} md="6" controlId="email">
                <DForm.Label>Email</DForm.Label>
                <DForm.Control
                  required
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </DForm.Group>
              <DForm.Group as={DCol} md="6" controlId="phone">
                <DForm.Label>Phone</DForm.Label>
                <DForm.Control
                  required
                  type="text"
                  placeholder="Phone Number"
                  autoComplete="off"
                  value={user.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </DForm.Group>
              <DForm.Group as={DCol} md={{ span: 6 }} controlId="password">
                <DForm.Label>Password</DForm.Label>
                <DForm.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  value={user.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </DForm.Group>
              <DForm.Group as={DCol} md="6" controlId="password">
                <DForm.Label>Confirm Password</DForm.Label>
                <DForm.Control
                  required
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="off"
                  value={user.confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </DForm.Group>
            </DForm.Row>
            <DButton variant="outline-primary" onClick={handleSubmit} block> Signup </DButton> 
            <Link to='/login'><DButton variant="link" block>Already have an account?  Login</DButton></Link>
          </DForm>
          </SignupBox>
        </DCol>
      </DRow>
    </DContainer>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { auth };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupRequest: (user) => dispatch(signupAction(user)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
