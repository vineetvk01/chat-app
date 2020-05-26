import React from 'react';
import { connect } from 'react-redux';
import PaddedHomeLayout from '../hoc/PadHome.hoc';
import DM from '../containers/DM';
import Home from '../containers/Home';

const ChatsPage = (props) => {

  return (
    <Home {...props}>
      <DM {...props} />
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
