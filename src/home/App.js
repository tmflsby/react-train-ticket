import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import Journey from './Journey';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Submit from './Submit';

import * as actionCreators from './actionCreators';

const App = (props) => {
  const { from, to, dispatch } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(actionCreators.exchangeFromTo());
  // }, []);
  //
  // const doShowCitySelector = useCallback((m) => {
  //   dispatch(actionCreators.showCitySelector(m));
  // }, []);

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo: actionCreators.exchangeFromTo,
      showCitySelector: actionCreators.showCitySelector
    }, dispatch);
  }, [dispatch]);

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/>
      </div>
      <form action="" className="form">
        <Journey
          from={from}
          to={to}
          {...cbs}
          // exchangeFromTo={doExchangeFromTo}
          // showCitySelector={doShowCitySelector}
        />
        <DepartDate/>
        <HighSpeed/>
        <Submit/>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
