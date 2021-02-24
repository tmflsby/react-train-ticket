import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer, { defaultState } from './reducer';

const store = createStore(combineReducers(reducer), defaultState, applyMiddleware(thunk));

export default store;
