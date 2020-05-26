import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';

import App from './containers/App';
import { Provider } from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';

dotenv.config();

const { store, persistor } = configureStore();

const AppWrapper = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
