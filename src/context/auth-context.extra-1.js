//app.extra-1 - no need to call the context anduse it we can make hook out of it and use it wherever we can

import * as React from 'react'

const AuthContext = React.createContext()

//a- creating custom hook for using authcontext and returning it
function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`)
  }
  return context
}

export {AuthContext, useAuth}

//goto authenticated-app-extra1.js,books.extra-1.js,list-items.extra-1.js