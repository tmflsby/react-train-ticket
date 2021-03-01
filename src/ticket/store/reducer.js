import * as actionTypes from './actionTypes';

export const defaultState = {
  departDate: Date.now(),
  arriveDate: Date.now(),
  departTimeStr: null,
  arriveTimeStr: null,
  departStation: null,
  arriveStation: null,
  trainNumber: null,
  durationStr: null,
  tickets: [],
  isScheduleVisible: false,
  searchParsed: false
};

const reducer = {
  departDate(state = defaultState.departDate, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_DEPART_DATE:
        return payload;
      default:
    }
    return state;
  },
  arriveDate(state = defaultState.arriveDate, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_ARRIVE_DATE:
        return payload;
      default:
    }
    return state;
  },
  departTimeStr(state = defaultState.departTimeStr, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_DEPART_TIME_STR:
        return payload;
      default:
    }
    return state;
  },
  arriveTimeStr(state = defaultState.arriveTimeStr, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_ARRIVE_TIME_STR:
        return payload;
      default:
    }
    return state;
  },
  departStation(state = defaultState.departStation, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_DEPART_STATION:
        return payload;
      default:
    }
    return state;
  },
  arriveStation(state = defaultState.arriveStation, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_ARRIVE_STATION:
        return payload;
      default:
    }
    return state;
  },
  trainNumber(state = defaultState.trainNumber, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_TRAIN_NUMBER:
        return payload;
      default:
    }
    return state;
  },
  durationStr(state = defaultState.durationStr, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_DURATION_STR:
        return payload;
      default:
    }
    return state;
  },
  tickets(state = defaultState.tickets, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_TICKETS:
        return payload;
      default:
    }
    return state;
  },
  isScheduleVisible(state = defaultState.isScheduleVisible, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  searchParsed(state = defaultState.searchParsed, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_SEARCH_PARSED:
        return payload;
      default:
    }
    return state;
  }
};

export default reducer;
