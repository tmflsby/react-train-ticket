import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import CitySelector from "../common/CitySelector";
import Journey from './components/Journey';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import Submit from './components/Submit';

import * as actionCreators from './store/actionCreators';

const App = (props) => {
  const {
    from, to, isCitySelectorVisible, cityData,
    isLoadingCityData, dispatch, departDate
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo: actionCreators.exchangeFromTo,
      showCitySelector: actionCreators.showCitySelector
    }, dispatch);
  }, [dispatch]);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: actionCreators.hideCitySelector,
      fetchCityData: actionCreators.fetchCityData,
      onSelect: actionCreators.setSelectedCity
    }, dispatch);
  },[dispatch]);

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: actionCreators.showDateSelector
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
        />
        <DepartDate
          time={departDate}
          {...departDateCbs}
        />
        <HighSpeed/>
        <Submit/>
        <CitySelector
          show={isCitySelectorVisible}
          cityData={cityData}
          isLoading={isLoadingCityData}
          {...citySelectorCbs}
        />
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
