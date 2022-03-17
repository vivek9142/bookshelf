/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 1-1-a - 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  //1-1-c-  🐨 useState for the user
  const [user,setUser] = React.useState(null);
  // 1-1-d-🐨 create a login function that calls auth.login then sets the user
   const login = form => auth.login(form).then(u => setUser(u))
  // 1-1-e-🐨 create a registration function that does the same as login except for register
  const register = form => auth.register(form).then(u => setUser(u))
  // 1-1-g-🐨 create a logout function that calls auth.logout() and sets the user to null
  const logout =  () => {
    auth.logout() 
    setUser(null)
  }
  
  // 1-1-b- add login  and register func in auth here
  // return <UnauthenticatedApp login={auth.login} register={auth.register}/>

  //1-1-f- replace auth.login and register with lgoin and register funcs and
  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register
  return user? <AuthenticatedApp user={user} logout={logout}/>: <UnauthenticatedApp login={login} register={register}/>
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
