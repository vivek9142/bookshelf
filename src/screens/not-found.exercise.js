/** @jsx jsx */
import {jsx} from '@emotion/core'

// This page displays a regular link on the page, and we've got a styled component
// for that.
// 🐨 1-1-j- Import the Link from 'components/lib'
import {Link} from 'components/lib';
// 💰 and feel free to take a peek at the implementation of that styled component
// to be reminded how you can create styled components out of existing components

function NotFoundScreen() {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here.
        {/* 1-1-k- 🐨 add a <Link> here that says "Go home" and sends the user to "/discover" +
        now go to book execise file
        */}
        <Link to='/discover'>Go Home</Link>
      </div>
    </div>
  )
}

export {NotFoundScreen}
