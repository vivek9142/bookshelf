/** @jsx jsx */
import {jsx} from '@emotion/core'

//1-2- if an list item is already list in mylist so we need not to show 
//add to list item but add delete item functionality 

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
// 🐨 you'll need useQuery, useMutation, and queryCache from 'react-query'
// 1-1-c -🐨 you'll also need client from 'utils/api-client'
import {client} from 'utils/api-client';

//1-1-a - import useMutation
//1-2-a- import useQuery
import { useMutation ,useQuery,queryCache} from 'react-query';
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  // 🐨 call useQuery here to get the listItem (if it exists)
  // queryKey should be 'list-items'
  // queryFn should call the list-items endpoint

  // 🐨 search through the listItems you got from react-query and find the
  // one with the right bookId.
  //1-2-b- instead of assigning list item to null w'ere going to call useQuery
  // const listItem = null;
  const {data:listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: ()=> client('list-items',{token:user.token}).then(data => data.listItems)
  });
  //1-02-c- if listrITems is present then go to another cond else null 
  const listItem = listItems?.find(li => li.bookId === book.id) ?? null;


  // 💰 for all the mutations below, if you want to get the list-items cache
  // updated after this query finishes the use the `onSettled` config option
  // to queryCache.invalidateQueries('list-items')

  // 🐨 call useMutation here and assign the mutate function to "update"
  // the mutate function should call the list-items/:listItemId endpoint with a PUT
  //   and the updates as data. The mutate function will be called with the updates
  //   you can pass as data.


  // 🐨 call useMutation here and assign the mutate function to "remove"
  // the mutate function should call the list-items/:listItemId endpoint with a DELETE

  //1-1-b-  🐨 call useMutation here and assign the mutate function to "create"
  // the mutate function should call the list-items endpoint with a POST
  // and the bookId the listItem is being created for.
  //we can call element any name that comes out of useMutation 

  //1-2-d- on adding book to the list it will not re-request to the api for updation of that state
  //we need to the react query hey i had just dont the mutation to backend in a way you're using to populate
  //the list item so we need to invalidate the mutate query
  const [create] = useMutation(
    ({bookId})=> client('list-items',{data:{bookId},token:user.token}),
    //1-2-d- add onSettled here and import queryCache to be used here  and also add key of query
    //to be invalidated
    {onSettled: ()=> queryCache.invalidateQueries('list-items')}
  )
  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as unread, set the finishDate to null
            // {id: listItem.id, finishDate: null}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as read, set the finishDate
            // {id: listItem.id, finishDate: Date.now()}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          // 🐨 add an onClick here that calls remove
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          // 1-1-d- 🐨 add an onClick here that calls create
          onClick = {()=> create({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
