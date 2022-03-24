//1-4- remake refetchBookSearchQuery with hooks to remove its dependency with user
//1-4-a- goto books.ex to make refetchBookSearchQuery as custom hooks

/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
// 1-4-e- 🐨 swap refetchBookSearchQuery with the new useRefetchBookSearchQuery
import {useBookSearch, useRefetchBookSearchQuery} from 'utils/books'
import * as colors from 'styles/colors'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'
import { AuthContext } from 'context/auth-context.exercise'

// 💣 remove the user prop here
function DiscoverBooksScreen( ) {
  //1-3-u- import userfrom authContext 
  const {user} = React.useContext(AuthContext);
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  // 1-2-e- 💣 remove the user argument here
  const {books, error, status} = useBookSearch(query)

  // 1-4-f-🐨 use the new useRefetchBookSearchQuery to get the
  // refetchBookSearchQuery function which handles accessing the user
  const refetchBookSearchQuery = useRefetchBookSearchQuery();

  React.useEffect(() => {
    // 💣 remove the user prop here
    return () => refetchBookSearchQuery(user)
    // 1-4-g- 💣 remove the user dependency here and add refetchBookSearchQuery instead and memoi9ze it in books.ex to 
    // recreate it when user gets updated
  }, [refetchBookSearchQuery])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      <div>
        {queried ? null : (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : isSuccess && books.length ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && !books.length ? (
              <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
      </div>
      {isSuccess ? (
        books.length ? (
          <BookListUL css={{marginTop: 20}}>
            {books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow
                  //1-3-v-  💣 remove the user prop here
                  // user={user}
                  key={book.id}
                  book={book}
                />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
