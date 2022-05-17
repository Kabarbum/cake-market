import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import menuReducer from "./reducers/menu";
import {composeWithDevTools} from "redux-devtools-extension";
import productsReducer from "./reducers/products";
import adminReducer from "./reducers/admin";

const rootReducer = combineReducers({
    menu: menuReducer,
    products: productsReducer,
    admin: adminReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))