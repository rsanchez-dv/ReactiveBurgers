import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Appends to all requests
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// Could be used to pass JWT token
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json'
//add some common header
// only works for global axios not instance
axios.interceptors.request.use(request =>{
  console.log(request);
  // edit request config add headers
  // need to return else your blocking
  return request;
},error =>{
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response=>{
  console.log(response)
  return response
},error =>{
  console.log(error)
  return Promise.reject(error);
})
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
