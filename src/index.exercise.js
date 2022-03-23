//1-17- if we go to a book which don't exist here ex - not-a-book then it will loading for 
//infinitely- so need to set error boundary for this - we have separate err boundary for routes,comp
//so we need to implement errr boundary for react-query by query by query basis or at an global level here
// so we'll do it for globally


import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
//1-17-a- React Provider for React Query
import { ReactQueryConfigProvider } from 'react-query';
import {App} from './app'

//1-17-c- add Config to provider 
const queryConfig = {
  queries:{
    useErrorBoundary:true,
    refetchOnWindowFocus:false,
    retry(failureCount,error){
      if(error.status === 404) return false
      else if(failureCount < 2) return true
      else return false
    }
  }
}


loadDevTools(() => {
  ReactDOM.render(
    // 1-17-b- surround app with React Query Provider and add config
  <ReactQueryConfigProvider config={queryConfig}>
    <App />
  </ReactQueryConfigProvider>
  ,
   document.getElementById('root'))
})
