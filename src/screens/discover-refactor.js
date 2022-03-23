/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'


//1-21- while add the list in the reading list we're getting some refetching after moving out and refetching the same 
//list - so we're removing the cache and prefetching the clist items.

//1-11-i remove the unwanted dependency
// import {useQuery} from 'react-query';
// import {client} from 'utils/api-client'

//1-11-g- import useBookSearch customHook you created
//1-21-a- import refetchBookSearchQuery
import { useBookSearch , refetchBookSearchQuery} from 'utils/books';

import * as colors from 'styles/colors'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'

//1-11-j - remove this too
// import bookPlaceholderSvg from 'assets/book-placeholder.svg'

// const loadingBook = {
//   title: 'Loading...',
//   author: 'loading...',
//   coverImageUrl: bookPlaceholderSvg,
//   publisher: 'Loading Publishing',
//   synopsis: 'Loading...',
//   loadingBook: true,
// }

// const loadingBooks = Array.from({length: 10}, (v, index) => ({
//   id: `loading-book-${index}`,
//   ...loadingBook,
// }))

function DiscoverBooksScreen({user}) {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)


  //1-21-b - add useEffect and add refetchBookSearchQuery func here
  React.useEffect(() => {
    refetchBookSearchQuery(user)
  },[user])
  
  //1-11-h- remove this stuff with the following data
  // const {data:books = loadingBooks, error, isLoading, isError, isSuccess} = useQuery({
  //   queryKey: ['bookSearch',{query}],
  //   queryFn:() => client(`books?query=${encodeURIComponent(query)}`,{
  //     token:user.token
  //   }).then(data => data.books)
  // })

  const {books, error, isLoading, isError, isSuccess} = useBookSearch(query,user)

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
                <BookRow user={user} key={book.id} book={book} />
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
