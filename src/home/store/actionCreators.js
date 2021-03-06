import * as actionTypes from './actionTypes';

export const setFrom = (from) => ({
  type: actionTypes.ACTION_SET_FROM,
  payload: from
});

export const setTo = (to) => ({
  type: actionTypes.ACTION_SET_TO,
  payload: to
});

export const setISLoadingCityData = (isLoadingCityData) => ({
  type: actionTypes.ACTION_SET_IS_LOADING_CITY_DATA,
  payload: isLoadingCityData
});

export const setCityData = (cityData) => ({
  type: actionTypes.ACTION_SET_CITY_DATA,
  payload: cityData
});

export const toggleHighSpeed = () => (dispatch, getState) => {
  const { highSpeed } = getState();

  dispatch({
    type: actionTypes.ACTION_SET_HIGH_SPEED,
    payload: !highSpeed
  });
};

export const showCitySelector = (currentSelectingLeftCity) => (dispatch) => {
  dispatch({
    type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: true
  });

  dispatch({
    type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    payload: currentSelectingLeftCity
  });
};

export const hideCitySelector = () => ({
  type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  payload: false
});

export const setSelectedCity = (city) => (dispatch, getState) => {
  const { currentSelectingLeftCity } = getState();

  if (currentSelectingLeftCity) {
    dispatch(setFrom(city));
  } else {
    dispatch(setTo(city));
  }

  dispatch(hideCitySelector());
};

export const showDateSelector = () => ({
  type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: true
});

export const hideDateSelector = () => ({
  type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: false
});

export const exchangeFromTo = () => (dispatch, getState) => {
  const { from, to } = getState();

  dispatch(setFrom(to));
  dispatch(setTo(from));
};

export const setDepartDate = (departDate) => ({
  type: actionTypes.ACTION_SET_DEPART_DATE,
  payload: departDate
});

export const fetchCityData = () => (dispatch, getState) => {
  const { isLoadingCityData } = getState();

  if (isLoadingCityData) {
    return;
  }

  const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

  if (Date.now() < cache.expires) {
    dispatch(setCityData(cache.data));
    return;
  }

  dispatch(setISLoadingCityData(true));

  fetch('/rest/cities?_' + Date.now())
    .then(res => res.json())
    .then(cityData => {
      dispatch(setCityData(cityData));

      localStorage.setItem('city_data_cache', JSON.stringify({
        expires: Date.now() * 60 * 1000,
        data: cityData
      }));

      dispatch(setISLoadingCityData(false));
    })
    .catch(() => {
      dispatch(setISLoadingCityData(false));
    });
};
