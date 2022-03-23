/** @jsx jsx */
import {jsx} from '@emotion/core'

//1-15 - refactor status -buttons ex.js code with custom hooks-- status-buttons.refactor.js

//1-16 - make custom hooks for remove and create for listItems in listItems.exercise.js 


import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
// import {client} from 'utils/api-client';
// import { useMutation ,useQuery,queryCache} from 'react-query';

//1-15-a,1-16-b-- import customHooks
import {useListItem,useUpdatedListItem,useCreateListItem,useRemoveListItem} from 'utils/list-items.exercise';

import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  //1-19-d add reset in import of async
  const {isLoading, isError, error, run,reset} = useAsync()

  //1-19-c- if error it will reset through reset() of useAsync
  function handleClick() {
    if(isError){
      reset()
    } else {
      run(onClick())
    }
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
  
  //1-15-b,1-16-c- replace files with customHooks, 
  //same logic of update is implemented in rating so refactoring in rating.refactor.js
  
  // const {data:listItems} = useQuery({
  //   queryKey: 'list-items',
  //   queryFn: ()=> client('list-items',{token:user.token}).then(data => data.listItems)
  // });
  // const listItem = listItems?.find(li => li.bookId === book.id) ?? null;

  const listItem = useListItem(user,book.id);

  // const [update] = useMutation(
  //   (updates)=> client(`list-items/${updates.id}`,{method:'PUT',data: updates,token:user.token}),
  //   {onSettled: ()=> queryCache.invalidateQueries('list-items')}
  // )

  //1-19-c- add throwOnError param in options as 2nd param.use this for update,remove and create

  const [update] = useUpdatedListItem(user,{throwOnError:true});

  // const [remove] = useMutation(
  //   ({id})=> client(`list-items/${id}`,{method:'DELETE',token:user.token}),
  //   {onSettled: ()=> queryCache.invalidateQueries('list-items')}
  // )
  const [remove] = useRemoveListItem(user,{throwOnError:true});

  // const [create] = useMutation(
  //   ({bookId})=> client('list-items',{data:{bookId},token:user.token}),
  //   {onSettled: ()=> queryCache.invalidateQueries('list-items')}
  // )

  const [create] = useCreateListItem(user,{throwOnError:true});

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            // 1-4-b- 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as unread, set the finishDate to null
            // {id: listItem.id, finishDate: null}
            onClick={() => update({id:listItem.id,finishDate:null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as read, set the finishDate
            // {id: listItem.id, finishDate: Date.now()}
            onClick={() => update({id:listItem.id,finishDate:Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          // 1-3-b - 🐨 add an onClick here that calls remove
          onClick={() => remove({id: listItem.id})}
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
