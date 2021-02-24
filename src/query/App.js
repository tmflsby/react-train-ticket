import React from 'react';
import { connect } from 'react-redux';
import Nav from '../common/Nav';
import List from './components/List';
import Bottom from './components/Bottom';
import './App.css';

const App = (props) => {
  return(
    <div>
      <Nav/>
      <List/>
      <Bottom/>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
