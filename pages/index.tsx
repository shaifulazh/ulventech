import { Provider } from 'react-redux';
import App from './App';
import React from 'react'
import { store } from '../redux/store';

export default function index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
