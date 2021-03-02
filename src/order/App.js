import React from 'react';
import { connect } from 'react-redux';
import './App.css';

const App = (props) => {
  const {
    trainNumber, departStation, arriveStation, seatType,
    departDate, arriveDate, departTimeStr, arriveTimeStr,
    durationStr, price, passengers, menu, isMenuVisible,
    searchParsed, dispatch
  } = props;

  return(
    <div className="app">

    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
