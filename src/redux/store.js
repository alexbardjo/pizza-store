import {createStore, compose, applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk';

import rootReducer from "./reducers";

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhansers(applyMiddleware(ReduxThunk)));


export default store;