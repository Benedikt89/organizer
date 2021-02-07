import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducersCombined = combineReducers({reducer});

const store = createStore(reducersCombined, composeWithDevTools(applyMiddleware(thunk)));
export default store;