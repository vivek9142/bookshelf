//1-3- handling fail requests 
// we want to reject the promise if the response OK is false
//1-3-a- go to client ex1 file and  make changes
/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
//1-3-g - adding cross svg when error is there while loading svg
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
// 1-3-f -adding colors for printing error on screen
import * as colors from './styles/colors'

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState('idle')
  const [data, setData] = React.useState()
  const [query, setQuery] = React.useState()
  const [queried, setQueried] = React.useState(false)
  //1-3-c- adding state for error
  const [error, setError] = React.useState(null)

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  //1-3-d- add status for error
  const isError = status === 'error'

  React.useEffect(() => {
    if (!queried) {
      return
    }
    setStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`).then(
      responseData => {
        setData(responseData)
        setStatus('success')
      },
      //1-3-b- adding error part for handling rejected promise
      errorData => {
        setError(errorData)
        setStatus('error')
      },
    )
  }, [query, queried])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
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
                //1-3-h - adding error part here
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {/* //1-3-e- adding error part if err then print error else null  */}
      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
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
