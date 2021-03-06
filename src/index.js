import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './firebase';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducers,{},
  composeWithDevTools(
    applyMiddleware( reduxThunk.withExtraArgument( {getFirebase} ) ),
    reactReduxFirebase(firebaseConfig, {attachAuthIsReady: true})
    )
  );
  
store.firebaseAuthIsReady.then(()=>{
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.getElementById('root')
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});

