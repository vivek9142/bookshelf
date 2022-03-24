// 🐨 we're going to use React hooks in here now so we'll need React
import React from 'react'
import {useQuery, useMutation, queryCache} from 'react-query'
// 1-3-a- 🐨 get AuthContext from context/auth-context
import { AuthContext } from 'context/auth-context.exercise';

import {setQueryDataForBook} from './books'
import {client} from './api-client'

// 💣 remove the user argument here
function useListItems() {
  // 1-3-b- instead of getting user from func param
  //🐨 get the user from React.useContext(AuthContext) and remove user from func param

  const {user} = React.useContext(AuthContext);
  const {data} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
    onSuccess: async listItems => {
      for (const listItem of listItems) {
        setQueryDataForBook(listItem.book)
      }
    },
  })
  return data ?? []
}

// 💣 remove the user argument here
function useListItem(bookId) {
  // 1-3-c-💣 you no longer need to pass the user here
  const listItems = useListItems()
  return listItems.find(li => li.bookId === bookId) ?? null
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

// 💣 remove the user argument here
function useUpdateListItem(options) {
  // 1-3-d- copy paste the authContext line and🐨 get the user from React.useContext(AuthContext)
  const {user} = React.useContext(AuthContext);

  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData('list-items')

        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })

        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}

// 💣 remove the user argument here
function useRemoveListItem(options) {
  // 1-3-e- copy paste the authContext line and🐨 get the user from React.useContext(AuthContext)
  const {user} = React.useContext(AuthContext);

  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {
      onMutate(removedItem) {
        const previousItems = queryCache.getQueryData('list-items')

        queryCache.setQueryData('list-items', old => {
          return old.filter(item => item.id !== removedItem.id)
        })

        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}

// 💣 remove the user argument here
function useCreateListItem(options) {
  // 1-3-f- copy paste the authContext line and🐨 get the user from React.useContext(AuthContext)
  //goto rating.ex , status-buttons.ex ,book.ex.js ,list-item-list.ex,Bookrow.ex,authenticated.ex  
  //to remove user from comp
  const {user} = React.useContext(AuthContext);

  return useMutation(
    ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
