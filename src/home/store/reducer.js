import * as actionTypes from './actionTypes';

const defaultState = {
  from: '北京',
  to: '上海',
  isCitySelectorVisible: false,
  currentSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectorVisible: false,
  highSpeed: false
}

const reducer = {
  from(state = defaultState.from, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_FROM:
        return payload;
      default:
    }
    return state;
  },
  to(state = defaultState.to, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_TO:
        return payload;
      default:
    }
    return state;
  },
  isCitySelectorVisible(state = defaultState.isCitySelectorVisible, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  currentSelectingLeftCity(state = defaultState.currentSelectingLeftCity, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
        return payload;
      default:
    }
    return state;
  },
  cityData(state = defaultState.cityData, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_CITY_DATA:
        return payload;
      default:
    }
    return state;
  },
  isLoadingCityData(state = defaultState.isLoadingCityData, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_IS_LOADING_CITY_DATA:
        return payload;
      default:
    }
    return state;
  },
  isDateSelectorVisible(state = defaultState.isDateSelectorVisible, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  highSpeed(state = defaultState.highSpeed, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_HIGH_SPEED:
        return payload;
      default:
    }
    return state;
  },
};

export default reducer;
