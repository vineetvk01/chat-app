import React from 'react';
import { connect } from 'react-redux';
import PaddedHomeLayout from '../hoc/PadHome.hoc';
import Home from '../containers/Home';
import Chats from '../containers/Chats';


const ChatsPage = (props) => {

  return (
    <Home {...props} >
      <Chats {...props} />
    </Home>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaddedHomeLayout(ChatsPage, {md: { span: 6, offset: 3 }}));
