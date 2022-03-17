//use function of API client  for api request to make it less cluterred


/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import React from 'react';
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
//1-2-a- import client 
import {client} from './utils/api-client'

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState('idle')
  const [query,setQuery] = React.useState('');
  const [queried, setQueried] = React.useState(false);
  const [data,setData] = React.useState(null)
  
  React.useEffect(()=>{
    if(!queried) {return}
    
    setStatus('loading');
    //1-2-b- remove the commented code and place this code in api client
    // window.fetch(`${process.env.REACT_APP_API_URL}/books?query=${encodeURIComponent(query)}`)
    // .then(response => response.json())
    client(`books?query=${encodeURIComponent(query)}`)
    .then(responseData => {
      setData(responseData)
      setStatus('success')
    })
  },[query,queried]);

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true)
    setQuery(event.target.elements.search.value);
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
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

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
