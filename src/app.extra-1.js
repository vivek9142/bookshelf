import * as React from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

const AuthenticatedApp = React.lazy(() =>
  // extra-1 - magic commments to prefetch auth app before user logs in, 
  //auth app is already fetched in memory
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
//you don't need to import do this for every scenario
// you  can use prefetch once you're sure user needs to use this comp soon

const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
