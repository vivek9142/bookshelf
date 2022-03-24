//1- we're currently passing all props from parnet comp to child
//comp so now we'll use context to get rid of this prop drilling
//prob

//1-1-a - create context in authContext.ex.js

/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullPageSpinner, FullPageErrorFallback} from './components/lib'
import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
// 1-1-b- 🐨 import the AuthContext you created in ./context/auth-context
import { AuthContext } from 'context/auth-context.exercise'

import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const props = {user, login, register, logout}
    // 1-1-c - 🐨 wrap all of this in the AuthContext.Provider and set the `value` to props
    return <AuthContext.Provider value={props}>
     {user ? (
      <Router>
        {/*1-1-d-💣 remove the props spread here */}
        <AuthenticatedApp/>
      </Router>
    ) : (
      //1-1-e-  💣 remove the props spread here - goto unAuthenticatedApp comp
      <UnauthenticatedApp />
    )}
    </AuthContext.Provider>
  }
}

export {App}
