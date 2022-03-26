import * as React from 'react'
import {client} from 'utils/api-client'

let queue = []

//extra-3- g- sending  the data at 5sec intervals
// extra3-2- goto book.extra-3.js. 
// extra3-3- goto list-item-list.extra-3.js and discover.extra-3.js. 
setInterval(sendProfileQueue, 5000)

//extra-3- f- function to send the data to backend 
function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend})
}

// extra-3- c- By wrapping the Profile like this, we can set the onRender to whatever
// we want and we get the additional benefit of being able to include
// additional data and filter phases
function Profiler({metadata, phases, ...props}) {
  
  // extra-3- d- make func for reporting profile to backend 

  function reportProfile(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions, // the Set of interactions belonging to this update
  ) {
    if (!phases || phases.includes(phase)) {
      //extra-3- e - add this info to queue
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }
  return <React.Profiler onRender={reportProfile} {...props} />
}

export {Profiler}
