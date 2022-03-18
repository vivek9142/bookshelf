// 💯 handle URL redirects
//Redirects with client side routers are interesting because 
//traditionally users would do the client side router and things would work pretty good that way
// you can have all routes defined in one place but the problem with that is Search engines and
//browsers don't get the proper status codes for these so you will get dinged for SEO context as well 
// as the browsers behaving properly for your redirects because  you can't 301,302 status for that.

//so it is better to do the redirect through the CDN or server that you're actually using and there are
//three contexts where we're using servers for our application so we're gonna configure all three of them

//so we're using create-react-app and we havbe some functionality here for setting up proxy which will 
//allow us to modify the express server that is running our development server

//go to setupProxy.exercise file

/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {Routes, Route, Link, useMatch} from 'react-router-dom'
import {Button} from './components/lib'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {DiscoverBooksScreen} from './screens/discover'
import {BookScreen} from './screens/book'
import {NotFoundScreen} from './screens/not-found'

function AuthenticatedApp({user, logout}) {
  return (
    <React.Fragment>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main css={{width: '100%'}}>
          <AppRoutes user={user} />
        </main>
      </div>
    </React.Fragment>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <Link
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.text,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          ':hover': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover': {
                background: colors.gray10,
              },
            }
          : null,
      ]}
      {...props}
    />
  )
}

function Nav() {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes({user}) {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverBooksScreen user={user} />} />
      <Route path="/book/:bookId" element={<BookScreen user={user} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {AuthenticatedApp}
