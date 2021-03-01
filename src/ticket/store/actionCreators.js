import * as actionTypes from './actionTypes';
import { h0 } from '../../common/utils/fp';

export const setDepartDate = (departDate) => ({
  type: actionTypes.ACTION_SET_DEPART_DATE,
  payload: departDate
});

export const setArriveDate = (arriveDate) => ({
  type: actionTypes.ACTION_SET_ARRIVE_DATE,
  payload: arriveDate
});

export const setDepartTimeStr = (departTimeStr) => ({
  type: actionTypes.ACTION_SET_DEPART_TIME_STR,
  payload: departTimeStr
});

export const setArriveTimeStr = (arriveTimeStr) => ({
  type: actionTypes.ACTION_SET_ARRIVE_TIME_STR,
  payload: arriveTimeStr
});

export const setDepartStation = (departStation) => ({
  type: actionTypes.ACTION_SET_DEPART_STATION,
  payload: departStation
});

export const setArriveStation = (arriveStation) => ({
  type: actionTypes.ACTION_SET_ARRIVE_STATION,
  payload: arriveStation
});

export const setTrainNumber = (trainNumber) => ({
  type: actionTypes.ACTION_SET_TRAIN_NUMBER,
  payload: trainNumber
});

export const setDurationStr = (durationStr) => ({
  type: actionTypes.ACTION_SET_DURATION_STR,
  payload: durationStr
});

export const setTickets = (tickets) => ({
  type: actionTypes.ACTION_SET_TICKETS,
  payload: tickets
})
export const setIsScheduleVisible = (isScheduleVisible) => ({
  type: actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE,
  payload: isScheduleVisible
});

export const toggleIsScheduleVisible = () => (dispatch, getState) => {
  const { isScheduleVisible } = getState();

  dispatch(setIsScheduleVisible(!isScheduleVisible));
};

export const setSearchParsed = (searchParsed) => ({
  type: actionTypes.ACTION_SET_SEARCH_PARSED,
  payload: searchParsed
});

export const nextDate = () => (dispatch, getState) => {
  const { departDate } = getState();

  dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
};

export const prevDate = () => (dispatch, getState) => {
  const { departDate } = getState();

  dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
};
