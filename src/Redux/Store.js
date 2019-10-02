import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducers";

const reducersCombined = combineReducers({reducer});

const store = createStore(reducersCombined, applyMiddleware(thunk));
export default store;