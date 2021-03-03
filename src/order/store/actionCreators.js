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

export const fetchInitial = (url) => (dispatch) => {
  fetch(url)
    .then(response => response.json())
    .then(result => {
      const {
        departTimeStr, arriveTimeStr,
        arriveDate, durationStr, price
      } = result;

      dispatch(setDepartTimeStr(departTimeStr));
      dispatch(setArriveTimeStr(arriveTimeStr));
      dispatch(setArriveDate(arriveDate));
      dispatch(setDurationStr(durationStr));
      dispatch(setPrice(price));
    });
};

let passengerIdSeed = 0;
export const createAdult = () => (dispatch, getState) => {
  const { passengers } = getState();

  for (let passenger of passengers) {
    const keys = Object.keys(passenger);

    for (let key of keys) {
      if (!passenger[key]) {
        return;
      }
    }
  }

  dispatch(setPassengers([
    ...passengers,
    {
      id: ++passengerIdSeed,
      name: '',
      ticketType: 'adult',
      licenceNo: '',
      seat: 'Z'
    }
  ]));
};

export const createChild = () => (dispatch, getState) => {
  const { passengers } = getState();

  let adultFound = null;

  for (let passenger of passengers) {
    const keys = Object.keys(passenger);

    for (let key of keys) {
      if (!passenger[key]) {
        return;
      }
    }

    if (passenger.ticketType === 'adult') {
      adultFound = passenger.id;
    }
  }

  if (!adultFound) {
    alert('请至少正确添加一个同行成人');
    return;
  }

  dispatch(setPassengers([
    ...passengers,
    {
      id: ++passengerIdSeed,
      name: '',
      gender: 'none',
      birthday: '',
      followAdult: adultFound,
      ticketType: 'child',
      seat: 'Z'
    }
  ]));
};

export const removePassenger = (id) => (dispatch, getState) => {
  const { passengers } = getState();

  const newPassengers = passengers.filter(passenger =>passenger.id !== id && passenger.followAdult !== id);

  dispatch(setPassengers(newPassengers));
};

export const updatePassenger = (id, data, keysToBeRemoved = []) => (dispatch, getState) => {
  const { passengers } = getState();

  for (let i = 0; i < passengers.length; ++i) {
    if (passengers[i].id === id) {
      const newPassengers = [...passengers];

      newPassengers[i] = Object.assign({}, passengers[i], data);

      for (let key of keysToBeRemoved) {
        delete newPassengers[i][key];
      }

      dispatch(setPassengers(newPassengers));

      break;
    }
  }
};

export const showMenu = (menu) => (dispatch) => {
  dispatch(setMenu(menu));
  dispatch(setIsMenuVisible(true));
};

export const hideMenu = () => setIsMenuVisible(false);

export const showGenderMenu = (id) => (dispatch, getState) => {
  const { passengers } = getState();

  const passenger =  passengers.find(passenger => passenger.id === id);

  if (!passenger) {
    return;
  }

  dispatch(showMenu({
    onPress: (gender) => {
      dispatch(updatePassenger(id, { gender }));
      dispatch(hideMenu());
    },
    options: [
      {
        title: '男',
        value: 'male',
        active: 'male' === passenger.gender
      },
      {
        title: '女',
        value: 'female',
        active: 'female' === passenger.gender
      }
    ]
  }));
};

export const showFollowAdultMenu = (id) => (dispatch, getState) => {
  const { passengers } = getState();

  const passenger = passengers.find(passenger => passenger.id === id);

  if (!passenger) {
    return;
  }

  dispatch(showMenu(
    {
      onPress: (followAdult) => {
        dispatch(updatePassenger(id, { followAdult }));
        dispatch(hideMenu());
      },
      options: passengers
        .filter(passenger => passenger.ticketType === 'adult')
        .map(adult => ({
          title: adult.name,
          value: adult.id,
          active: adult.id === passenger.followAdult
        })),
    }
  ));
};

export const showTicketTypeMenu = (id) => (dispatch, getState) => {
  const { passengers } = getState();

  const passenger = passengers.find(passenger => passenger.id === id);

  if (!passenger) {
    return;
  }

  dispatch(showMenu({
    onPress: (ticketType) => {
      if ('adult' === ticketType) {
        dispatch(updatePassenger(
          id,
          {
            ticketType,
            licenceNo: ''
          },
          ['gender', 'followAdult', 'birthday']
        ));
      } else {
        const adult = passengers.find(
          passenger => passenger.id !== id && passenger.ticketType === 'adult'
        );

        if (adult) {
          dispatch(updatePassenger(
            id,
            {
              ticketType,
              gender: '',
              followAdult: adult.id,
              birthday: ''
            },
            ['licenceNo']
          ));
        } else {
          alert('没有其他成人乘客');
        }
      }

      dispatch(hideMenu());
    },
    options: [
      {
        title: '成人票',
        value: 'adult',
        active: 'adult' === passenger.ticketType
      },
      {
        title: '儿童票',
        value: 'child',
        active: 'child' === passenger.ticketType,
      }
    ]
  }));
}
