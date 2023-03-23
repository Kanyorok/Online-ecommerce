import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({

})

let initialState = {};

const middle_ware = [thunk];
const store = configureStore({reducer: reducers}, initialState, composeWithDevTools(applyMiddleware(...middle_ware)))

export default store