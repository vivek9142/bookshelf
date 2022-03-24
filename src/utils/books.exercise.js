//1-2- goto books.ex and update the user with accessing context

// 🐨 we're going to use React hooks in here now so we'll need React
import React from 'react';
import {useQuery, queryCache} from 'react-query'
// 1-2-a- 🐨 get AuthContext from context/auth-context
import { AuthContext } from 'context/auth-context.exercise';

import {client} from './api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

// 🦉 note that this is *not* treated as a hook and is instead called by other hooks
// So we'll continue to accept the user here.
const getBookSearchConfig = (query,user) => ({
  
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book)
      }
    },
  },
})

// 💣 remove the user argument here
function useBookSearch(query) {
  //1-2-b- instead of getting user we can get user from context and we can remove user from param of func
  const {user} = React.useContext(AuthContext)
  // 🐨 get the user from React.useContext(AuthContext)
  const result = useQuery(getBookSearchConfig(query, user))
  return {...result, books: result.data ?? loadingBooks}
}

// 💣 remove the user argument here
function useBook(bookId) {
  //1-2-c- use the same for useBook - now goto Book.ex,discover.ex.js to remove user in func param
  const {user} = React.useContext(AuthContext)
  // 🐨 get the user from React.useContext(AuthContext)
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })
  return data ?? loadingBook
}
//1-4-a- goto books.ex to make refetchBookSearchQuery as custom hooks
// we don't want to accept the user here anymore. Instead we'll make a new
// hook that gets the user and then returns this function
// (memoized with React.useCallback)
// 🐨 create a useRefetchBookSearchQuery hook here which:
// 1. Gets the user from the AuthContext
// 2. Returns a memoized callback (React.useCallback) version of this
// refetchBookSearchQuery function. It should no longer need to accept user as
// an argument and instead lists it as a dependency.

function useRefetchBookSearchQuery(){
  const {user} = React.useContext(AuthContext);

  //1-4-c- it no longer needs user in its func param
  // 1-4-h- 💣memoize it in books.ex to recreate it when user gets updated
  return React.useCallback(async function refetchBookSearchQuery() {
    queryCache.removeQueries('bookSearch')
    await queryCache.prefetchQuery(getBookSearchConfig('', user))
  },[user])
  
}

//1-4-b- paste it in above custom hook as return func
// async function refetchBookSearchQuery(user) {
//   queryCache.removeQueries('bookSearch')
//   await queryCache.prefetchQuery(getBookSearchConfig('', user))
// }

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function setQueryDataForBook(book) {
  queryCache.setQueryData(['book', {bookId: book.id}], book, bookQueryConfig)
}

// 1-4-d- export useRefetchBookSearchQuery instead of refetchBookSearchQuery
export {useBook, useBookSearch, useRefetchBookSearchQuery, setQueryDataForBook}
