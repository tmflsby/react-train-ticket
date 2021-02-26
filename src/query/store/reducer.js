import * as actionTypes from './actionTypes';
import { h0 } from '../../common/utils/fp';
import { ORDER_DEPART } from './constant';

export const defaultState = {
  from: null,
  to: null,
  departDate: h0(Date.now()),
  highSpeed: false,
  trainList: [],
  orderType: ORDER_DEPART,
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketTypes: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  departTimeStart: 0,
  departTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  isFiltersVisible: false,
  searchParsed: false
};

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
  departDate(state = defaultState.departDate, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.ACTION_SET_DEPART_DATE:
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
      case actionTypes.ACTION_SET_CHECKED_TRAIN_TYPES:
        const checkedTrainTypes = payload;
        return Boolean(checkedTrainTypes[1] && checkedTrainTypes[5]);
      default:
    }
    return state;
  },
  trainList(state = defaultState.trainList, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_TRAIN_LIST:
        return payload;
      default:
    }
    return state;
  },
  orderType(state = defaultState.orderType, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_ORDER_TYPE:
        return payload;
      default:
    }
    return state;
  },
  onlyTickets(state = defaultState.onlyTickets, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_ONLY_TICKETS:
        return payload;
      default:
    }
    return state;
  },
  ticketTypes(state = defaultState.ticketTypes, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_TICKET_TYPES:
        return payload;
      default:
    }
    return state;
  },
  checkedTicketTypes(state = defaultState.checkedTicketTypes, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_CHECKED_TICKET_TYPES:
        return payload;
      default:
    }
    return state;
  },
  trainTypes(state = defaultState.trainTypes, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_TRAIN_TYPES:
        return payload;
      default:
    }
    return state;
  },
  checkedTrainTypes(state = defaultState.checkedTrainTypes, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_CHECKED_TRAIN_TYPES:
        return payload;
      case actionTypes.ACTION_SET_HIGH_SPEED:
        const highSpeed = payload;
        const newCheckedTrainTypes = {...state};

        if (highSpeed) {
          newCheckedTrainTypes[1] = true;
          newCheckedTrainTypes[5] = true;
        } else {
          delete newCheckedTrainTypes[1];
          delete newCheckedTrainTypes[5];
        }

        return newCheckedTrainTypes;
      default:
    }
    return state;
  },
  departStations(state = defaultState.departStations, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_DEPART_STATIONS:
        return payload;
      default:
    }
    return state;
  },
  checkedDepartStations(state = defaultState.checkedDepartStations, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_CHECKED_DEPART_STATIONS:
        return payload;
      default:
    }
    return state;
  },
  arriveStations(state = defaultState.arriveStations, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_ARRIVE_STATIONS:
        return payload;
      default:
    }
    return state;
  },
  checkedArriveStations(state = defaultState.checkedArriveStations, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_CHECKED_ARRIVE_STATIONS:
        return payload;
      default:
    }
    return state;
  },
  departTimeStart(state = defaultState.departTimeStart, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_DEPART_TIME_START:
        return payload;
      default:
    }
    return state;
  },
  departTimeEnd(state = defaultState.departTimeEnd, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_DEPART_TIME_END:
        return payload;
      default:
    }
    return state;
  },
  arriveTimeStart(state = defaultState.arriveTimeStart, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_ARRIVE_TIME_START:
        return payload;
      default:
    }
    return state;
  },
  arriveTimeEnd(state = defaultState.arriveTimeEnd, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_ARRIVE_TIME_END:
        return payload;
      default:
    }
    return state;
  },
  isFiltersVisible(state = defaultState.isFiltersVisible, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_IS_FILTERS_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  searchParsed(state = defaultState.searchParsed, action) {
    const { type, payload } = action;
    switch(type) {
      case actionTypes.ACTION_SET_SEARCH_PARSED:
        return payload;
      default:
    }
    return state;
  }
};

export default reducer;
