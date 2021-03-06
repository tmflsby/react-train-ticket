import React, { useCallback, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/utils/fp';
import useNav from '../common/hooks/useNav';
import Header from '../common/components/Header';
import Nav from '../common/components/Nav';
import List from './components/List';
import Bottom from './components/Bottom';
import * as actionCreators from './store/actionCreators';
import './App.css';

const App = (props) => {
  const {
    from, to, departDate, highSpeed, searchParsed, dispatch, orderType, onlyTickets,
    trainList, isFiltersVisible, ticketTypes, trainTypes, departStations, arriveStations,
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

    dispatch(actionCreators.setSearchParsed(true));
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

  const {
    prev, next, isPrevDisabled, isNextDisabled
  } = useNav(departDate, dispatch, actionCreators.prevDate, actionCreators.nextDate)

  const bottomCbs = useMemo(() => {
    return bindActionCreators({
      toggleOrderType: actionCreators.toggleOrderType,
      toggleHighSpeed: actionCreators.toggleHighSpeed,
      toggleOnlyTickets: actionCreators.toggleOnlyTickets,
      toggleIsFiltersVisible: actionCreators.toggleIsFiltersVisible,
      setCheckedTicketTypes: actionCreators.setCheckedTicketTypes,
      setCheckedTrainTypes: actionCreators.setCheckedTrainTypes,
      setCheckedDepartStations: actionCreators.setCheckedDepartStations,
      setCheckedArriveStations: actionCreators.setCheckedArriveStations,
      setDepartTimeStart: actionCreators.setDepartTimeStart,
      setDepartTimeEnd: actionCreators.setDepartTimeEnd,
      setArriveTimeStart: actionCreators.setArriveTimeStart,
      setArriveTimeEnd: actionCreators.setArriveTimeEnd
    }, dispatch);
  }, [dispatch]);

  if (!searchParsed) {
    return null;
  }

  return(
    <div>
      <div className="header-wrapper">
        <Header
          title={`${from} ⇀ ${to}`}
          onBack={onBack}
        />
      </div>
      <Nav
        date={departDate}
        prev={prev}
        next={next}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      />
      <List list={trainList}/>
      <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        {...bottomCbs}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
