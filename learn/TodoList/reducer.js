const reducers = {
  todos: (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case 'set':
        return payload;
      case 'add':
        return [...state, payload];
      case 'remove':
        return state.filter(todo => todo.id !== payload);
      case 'toggle':
        return state.map(todo => todo.id === payload ? { ...todo, complete: !todo.complete } : todo);
      default:
    }

    return state;
  },
  incrementCount: (state, action) => {
    const { type } = action;

    switch (type) {
      case 'set':
      case 'add':
        return state + 1;
      default:
    }

    return state;
  }
}

const combineReducers = (reducers) => {
  return (state, action) => {
    const changed = {};

    for (let reducersKey in reducers) {
      changed[reducersKey] = reducers[reducersKey](state[reducersKey], action);
    }

    return {
      ...state,
      ...changed
    };
  };
};

const reducer = combineReducers(reducers);

export default reducer;
