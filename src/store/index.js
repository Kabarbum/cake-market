import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import menuReducer from "./reducers/menu";
import {composeWithDevTools} from "redux-devtools-extension";
import productsReducer from "./reducers/products";
import adminReducer from "./reducers/admin";
import {firebaseReducer, getFirebase} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import fillingsReducer from "./reducers/fillings";
import calendarReducer from "./reducers/calendar";

const rootReducer = combineReducers({
    menu: menuReducer,
    products: productsReducer,
    fillings: fillingsReducer,
    admin: adminReducer,
    calendar: calendarReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(getFirebase))))