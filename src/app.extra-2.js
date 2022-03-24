//app.extra-2 💯 create an `AuthProvider` component goto app.extra-2.js
//copy all the data most of App.exercise.js data into context module and we can refactor there.

//a- we'll get rid of getUser, getting the user info and what we render based on user's information
//b - we'll only render the part of app based on the user 

//c- go to index.extra-2.js for use of AuthProvider within app

import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from './context/auth-context'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const {user} = useAuth()
  return user ? (
    <Router>
      <AuthenticatedApp />
    </Router>
  ) : (
    <UnauthenticatedApp />
  )
}

export {App}
