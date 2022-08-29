import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom";
import {store} from "./store";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import {firestore} from "./firebase";
import {createFirestoreInstance} from "redux-firestore";

const root = ReactDOM.createRoot(document.getElementById('root'));

const rrfConfig = {
    userProfile: 'users'
}
const rrfProps = {
    firebase:firestore,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance: createFirestoreInstance
}
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App/>
            </ReactReduxFirebaseProvider>
        </BrowserRouter>
    </Provider>
);
