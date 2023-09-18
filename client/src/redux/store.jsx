import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authSlice';
import counterReducer from "./reducers/counterSlice";
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({ counter: counterReducer, auth: authReducer, user: userReducer })

const store = configureStore({reducer: rootReducer}, applyMiddleware(thunk));

export default store;