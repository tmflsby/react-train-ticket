import React, { useCallback, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import Header from '../common/components/Header';
import Detail from '../common/components/Detail';
import Ticket from './components/Ticket';
import Passengers from './components/Passengers';
import Choose from './components/Choose';
import Account from './components/Account';
import Menu from './components/Menu';
import * as actionCreators from './store/actionCreators';
import './App.css';

const App = (props) => {
  const {
    trainNumber, departStation, arriveStation, seatType,
    departDate, arriveDate, departTimeStr, arriveTimeStr,
    durationStr, price, passengers, menu, isMenuVisible,
    searchParsed, dispatch
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { trainNumber, dStation, aStation, type, date } = queries;

    dispatch(actionCreators.setDepartStation(dStation));
    dispatch(actionCreators.setArriveStation(aStation));
    dispatch(actionCreators.setTrainNumber(trainNumber));
    dispatch(actionCreators.setSeatType(type));
    dispatch(actionCreators.setDepartDate(dayjs(date).valueOf()));
    dispatch(actionCreators.setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString();

    dispatch(actionCreators.fetchInitial(url));
  }, [
    searchParsed, departStation, arriveStation,
    seatType, departDate, dispatch
  ]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const passengersCbs = useMemo(() => {
    return bindActionCreators({
      createAdult: actionCreators.createAdult,
      createChild: actionCreators.createChild,
      removePassenger: actionCreators.removePassenger,
      updatePassenger: actionCreators.updatePassenger,
      showGenderMenu: actionCreators.showGenderMenu,
      showFollowAdultMenu: actionCreators.showFollowAdultMenu,
      showTicketTypeMenu: actionCreators.showTicketTypeMenu
    }, dispatch);
  }, [dispatch]);

  const chooseCbs = useMemo(() => {
    return bindActionCreators({
      updatePassenger: actionCreators.updatePassenger
    }, dispatch);
  }, [dispatch])

  const menuCbs = useMemo(() => {
    return bindActionCreators({
      hideMenu: actionCreators.hideMenu
    }, dispatch);
  }, [dispatch]);

  if (!searchParsed) {
    return null;
  }

  return(
    <div className="app">
      <div className="header-wrapper">
        <Header
          title="订单填写"
          onBack={onBack}
        />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
          <span
            className="train-icon"
            style={{
              display: "block"
            }}
          />
        </Detail>
      </div>
      <Ticket
        price={price}
        type={seatType}
      />
      <Passengers
        passengers={passengers}
        {...passengersCbs}
      />
      {
        passengers.length > 0 && (
          <Choose
            passengers={passengers}
            {...chooseCbs}
          />
        )
      }
      <Account
        price={price}
        length={passengers.length}
      />
      <Menu
        show={isMenuVisible}
        {...menu}
        {...menuCbs}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
