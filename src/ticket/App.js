import React from 'react';
import { connect } from 'react-redux';
import './App.css';

const App = (props) => {
  const {  } = props;

  return(
    <div></div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
