import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import Journey from './Journey';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Submit from './Submit';

const App = (props) => {
  return (
    <div>
      <Header/>
      <Journey/>
      <DepartDate/>
      <HighSpeed/>
      <Submit/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
