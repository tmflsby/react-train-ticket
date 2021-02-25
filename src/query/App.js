import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/utils/fp';
import Header from '../common/Header';
import Nav from '../common/Nav';
import List from './components/List';
import Bottom from './components/Bottom';
import * as actionCreators from './store/actionCreators';
import './App.css';

const App = (props) => {
  const {
    from, to, departDate, highSpeed, searchParsed, dispatch, orderType, onlyTickets,
    checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations,
    departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { from, to, date, highSpeed } = queries;

    dispatch(actionCreators.setFrom(from));
    dispatch(actionCreators.setTo(to));
    dispatch(actionCreators.setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(actionCreators.setHighSpeed(highSpeed === 'true'));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
      .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation
              }
            }
          }
        } = result;

        dispatch(actionCreators.setTrainList(trains));
        dispatch(actionCreators.setTicketTypes(ticketType));
        dispatch(actionCreators.setTrainTypes(trainType));
        dispatch(actionCreators.setDepartStations(depStation));
        dispatch(actionCreators.setArriveStations(arrStation));
      });
  }, [
    from, to, departDate, highSpeed, searchParsed, dispatch, orderType, onlyTickets,
    checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations,
    departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd
  ]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return(
    <div>
      <div className="header-wrapper">
        <Header
          title={`${from} ⇀ ${to}`}
          onBack={onBack}
        />
      </div>
      <Nav/>
      <List/>
      <Bottom/>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
