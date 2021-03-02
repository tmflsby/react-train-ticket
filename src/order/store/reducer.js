import * as actionTypes from './actionTypes';

export const defaultState = {
  trainNumber: null,
  departStation: null,
  arriveStation: null,
  seatType: null,
  departDate: Date.now(),
  arriveDate: Date.now(),
  departTimeStr: null,
  arriveTimeStr: null,
  durationStr: null,
  price: null,
  passengers: [],
  menu: null,
  isMenuVisible: false,
  searchParsed: false
};

const reducer = {
  trainNumber(state = defaultState.trainNumber, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_TRAIN_NUMBER:
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
  seatType(state = defaultState.seatType, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_SEAT_TYPE:
        return payload;
      default:
    }
    return state;
  },
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
  durationStr(state = defaultState.durationStr, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_DURATION_STR:
        return payload;
      default:
    }
    return state;
  },
  price(state = defaultState.price, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_PRICE:
        return payload;
      default:
    }
    return state;
  },
  passengers(state = defaultState.passengers, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_PASSENGERS:
        return payload;
      default:
    }
    return state;
  },
  menu(state = defaultState.menu, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_MENU:
        return payload;
      default:
    }
    return state;
  },
  isMenuVisible(state = defaultState.isMenuVisible, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_IS_MENU_VISIBLE:
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
