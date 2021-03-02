import * as actionTypes from './actionTypes';

export const setTrainNumber = (trainNumber) => ({
  type: actionTypes.ACTION_SET_TRAIN_NUMBER,
  payload: trainNumber
});

export const setDepartStation = (departStation) => ({
  type: actionTypes.ACTION_SET_DEPART_STATION,
  payload: departStation
});

export const setArriveStation = (arriveStation) => ({
  type: actionTypes.ACTION_SET_ARRIVE_STATION,
  payload: arriveStation
});

export const setSeatType = (seatType) => ({
  type: actionTypes.ACTION_SET_SEAT_TYPE,
  payload: seatType
});

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

export const setDurationStr = (durationStr) => ({
  type: actionTypes.ACTION_SET_DURATION_STR,
  payload: durationStr
});

export const setPrice = (price) => ({
  type: actionTypes.ACTION_SET_PRICE,
  payload: price
});

export const setPassengers = (passengers) => ({
  type: actionTypes.ACTION_SET_PASSENGERS,
  payload: passengers
});

export const setMenu = (menu) => ({
  type: actionTypes.ACTION_SET_MENU,
  payload: menu
});

export const setIsMenuVisible = (isMenuVisible) => ({
  type: actionTypes.ACTION_SET_IS_MENU_VISIBLE,
  payload: isMenuVisible
});

export const setSearchParsed = (searchParsed) => ({
  type: actionTypes.ACTION_SET_SEARCH_PARSED,
  payload: searchParsed
});
