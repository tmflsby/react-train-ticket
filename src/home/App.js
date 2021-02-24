import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { h0 } from '../common/utils/fp';
import Header from '../common/Header';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import Journey from './components/Journey';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import Submit from './components/Submit';
import * as actionCreators from './store/actionCreators';
import './App.css';
import {hideDateSelector, setDepartDate} from "./store/actionCreators";

const App = (props) => {
  const {
    from, to, isCitySelectorVisible, isDateSelectorVisible,
    cityData, isLoadingCityData, dispatch, departDate, highSpeed
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const journeyCbs = useMemo(() => {
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

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: actionCreators.hideDateSelector
    }, dispatch);
  }, [dispatch]);

  const onSelectDate = useCallback((day) => {
    if (!day) {
      return;
    }
    if (day < h0()) {
      return;
    }
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, [dispatch]);

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({
      toggle: actionCreators.toggleHighSpeed
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
          {...journeyCbs}
        />
        <DepartDate
          time={departDate}
          {...departDateCbs}
        />
        <HighSpeed
          highSpeed={highSpeed}
          {...highSpeedCbs}
        />
        <Submit/>
        <CitySelector
          show={isCitySelectorVisible}
          cityData={cityData}
          isLoading={isLoadingCityData}
          {...citySelectorCbs}
        />
        <DateSelector
          show={isDateSelectorVisible}
          onSelect={onSelectDate}
          {...dateSelectorCbs}
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
