export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';

export const setFrom = (from) => ({
  type: ACTION_SET_FROM,
  payload: from
});

export const setTo = (to) => ({
  type: ACTION_SET_TO,
  payload: to
});

export const setISLoadingCityData = (isLoadingCityData) => ({
  type: ACTION_SET_IS_LOADING_CITY_DATA,
  payload: isLoadingCityData
});

export const setCityData = (cityData) => ({
  type: ACTION_SET_CITY_DATA,
  payload: cityData
});

export const toggleHighSpeed = () => (dispatch, getState) => {
  const { highSpeed } = getState();
  dispatch({
    type: ACTION_SET_HIGH_SPEED,
    payload: !highSpeed
  });
};

export const showCitySelector = (currentSelectingLeftCity) => (dispatch) => {
  dispatch({
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: true
  });
  dispatch({
    type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    payload: currentSelectingLeftCity
  });
};

export const hideCitySelector = () => ({
  type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  payload: false
});

export const setSelectedCity = (city) => (dispatch, getState) => {
  const { currentSelectingLeftCity } = getState();
  if (currentSelectingLeftCity) {
    dispatch(setFrom(city));
  } else {
    dispatch(setTo(city));
  }
};

export const showDateSelector = () => ({
  type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: true
});

export const hideDateSelector = () => ({
  type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: false
});

export const exchangeFromTo = () => (dispatch, getState) => {
  const { from, to } = getState();
  dispatch(setFrom(to));
  dispatch(setTo(from));
}
