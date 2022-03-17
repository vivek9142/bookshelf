//1-4- use custom hook for refactoring of code

/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import * as colors from './styles/colors'
//1-4-a- import useAsync
import {useAsync} from './utils/hooks'

function DiscoverBooksScreen() {
  //1-4-d- call custom hook useAsync and take values form it
  //run is responsible for execution of async func and it update data,error and status values
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  const [query, setQuery] = React.useState()
  const [queried, setQueried] = React.useState(false)

  //1-4-a- removing data,error states and also derieved values

  // const [data, setData] = React.useState()
  // const [error, setError] = React.useState(null)

  // const isLoading = status === 'loading'
  // const isSuccess = status === 'success'
  // const isError = status === 'error'

  React.useEffect(() => {
    if (!queried) {
      return
    }
    //1-4-b- removing loading status value
    //setStatus('loading')

    //1-4-c- removing the then part from here and add client func in run taken from useAsync
    // client(`books?query=${encodeURIComponent(query)}`)
    // .then(
    //   responseData => {
    //     setData(responseData)
    //     setStatus('success')
    //   },
    //   errorData => {
    //     setError(errorData)
    //     setStatus('error')
    //   },
    // )

    run(client(`books?query=${encodeURIComponent(query)}`))
    //1-4-e- add run in dependency list
  }, [query, queried, run])

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
