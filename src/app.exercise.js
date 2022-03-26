
import * as React from 'react'
import {useAuth} from './context/auth-context'
// 🐨 you'll want to render the FullPageSpinner as the fallback
import { FullPageSpinner } from 'components/lib';

// 1-1-a- 🐨 exchange these for React.lazy calls
// import {AuthenticatedApp} from './authenticated-app'
// import {UnauthenticatedApp} from './unauthenticated-app'

//1-1-b - got an error -lazy:Expected result of dynamic import .instead received object Module
//Authenticateded App is not exported as default so need to export it as default to make this 
//work - goto authenticatedApp

const AuthenticatedApp  = React.lazy(()=> import('./authenticated-app'));
//1-1-e- if app is already logged in, so unAuthenticatedApp will load unauth app even if we're not showing it
//so we need to lazy load this also - now goto unAuth app.ex,unauthapp, and change the exports to default
const UnauthenticatedApp = React.lazy(()=> import('./authenticated-app'));

function App() {
  const {user} = useAuth()
  // 1-1-d- 🐨 wrap this in a <React.Suspense /> component
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
