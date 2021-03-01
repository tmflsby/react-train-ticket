import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/utils/fp';
import Header from '../common/components/Header';
import Nav from '../common/components/Nav';
import useNav from '../common/hooks/useNav';
import Detail from '../common/components/Detail';
import Candidate from './components/Candidate';
import { TrainContext } from './store/context';
import * as actionCreators from './store/actionCreators'
import './App.css';

const Schedule = lazy(() => import('./components/Schedule'))

const App = (props) => {
  const {
    departDate, arriveDate, departTimeStr, arriveTimeStr,
    departStation, arriveStation, trainNumber, durationStr,
    tickets, isScheduleVisible, searchParsed, dispatch
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, date, trainNumber } = queries;

    dispatch(actionCreators.setDepartStation(dStation));
    dispatch(actionCreators.setArriveStation(aStation));
    dispatch(actionCreators.setTrainNumber(trainNumber));
    dispatch(actionCreators.setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(actionCreators.setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const { detail, candidates } = result;
        const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail;

        dispatch(actionCreators.setDepartTimeStr(departTimeStr));
        dispatch(actionCreators.setArriveTimeStr(arriveTimeStr));
        dispatch(actionCreators.setArriveDate(arriveDate));
        dispatch(actionCreators.setDurationStr(durationStr));
        dispatch(actionCreators.setTickets(candidates));
      })
  }, [searchParsed, departDate, trainNumber, dispatch]);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const {
    prev, next, isPrevDisabled, isNextDisabled
  } = useNav(departDate, dispatch, actionCreators.prevDate, actionCreators.nextDate);

  const detailCbs = useMemo(() => {
    return bindActionCreators({
      toggleIsScheduleVisible: actionCreators.toggleIsScheduleVisible
    }, dispatch);
  }, [dispatch]);

  if (!searchParsed) {
    return null;
  }

  return(
    <div className='app'>
      <div className="header-wrapper">
        <Header
          title={trainNumber}
          onBack={onBack}
        />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          prev={prev}
          next={next}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
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
          {...detailCbs}
        />
      </div>
      <TrainContext.Provider
        value={{
          trainNumber,
          departStation,
          arriveStation,
          departDate
        }}
      >
        <Candidate tickets={tickets}/>
      </TrainContext.Provider>
      {
        isScheduleVisible && (
          <div
            className="mask"
            onClick={() => dispatch(actionCreators.toggleIsScheduleVisible())}
          >
            <Suspense
              fallback={
                <div>loading</div>
              }
            >
              <Schedule
                date={departDate}
                trainNumber={trainNumber}
                departStation={departStation}
                arriveStation={arriveStation}
              />
            </Suspense>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
