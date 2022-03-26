import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {Profiler} from 'components/profiler'
import {App} from './app'
import {AppProviders} from './context'

loadDevTools(() => {
  ReactDOM.render(
    // extra-3 -a -  adding profiler to check changes in app in production phase and adding args to check
    // args shared in console (we'll get logs for each render phase of our app)
    //,id is shared to differentiate with other react profilers
    
    //but after a while it gets overwhelving we're getting info that is valuable 
    //how can we interpret this in useful way so maybe using single react profiler we'll put it 
    //in several places that handles sending this to backend
    

    // <React.Profiler id="App Root" onRender={(...args) => console.log(...args)}>
    //   <AppProviders>
    //     <App />
    //   </AppProviders>
    // </React.Profiler>,


    // extra-3- b- we'll make our own profiler comp AND we only care about our mount phase, we have this one to 
    //ignore update phases. go here to see profile comp - 'components/profiler'
    
    <Profiler id="App Root" phases={['mount']}>
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>,
    document.getElementById('root'),
  )
})
