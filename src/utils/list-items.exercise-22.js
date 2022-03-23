//1-22 - while going to all books we need to cache the specific book as well  -
//we cached the books in booksearch,not in book query key, we're looking for book in book key while
//all data is present in booksearch so we'll add all books to book key query

//1-23- we don't need to wait for rating,notesand mark as read to
// be updated we can do this by react query if req is failed the nwe  can roll it back else its great
// for this we need to add some additional config here in useUpdateListItem

import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'
//1-22-g- import setQueryDataFromBook
import {setQueryDataForBook} from './books.exercise-21'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),

    //1-22-f- add config to add all books from search into book key query (copy paste of book.ex-21.js)
    config: {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          //1-22-h- replace this with import func setQueryDataForBook()
          // queryCache.setQueryData(['book',{bookId:listItem.book.id}],listItem.book)
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })

  return listItems ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId) ?? null
}
//1-23-e - add onError func in here but all function doesn't have this as recovery func so 
//we need to define cond on this.
const defaultMutationOptions = {
    // onError(err,variables,recover){
    //     recover();
    // },
    onError(err,variables,recover){
        if(typeof recover === 'function') recover();
    },
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdatedListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
      //1-23-a- we need to add onMutate in extra options here and add queryCache and set it to its key
    {
    onMutate(newItem){
        const previousItems = queryCache.getQueryData('list-items');

        queryCache.setQueryData('list-items',old => {
            return old.map(item => {
                return item.id === newItem.id ? {...item,...newItem} : item
            })
        })
        //1-23-b- if there is req failure then it will roll back to its previous state
        return () => queryCache.setQueryData('list-items',previousItems)
    },
    //1-23-c- so the return func will be passed onto recover function in onError to recover it to what it was
    //in previous state
    //1-23-d- this function we need ion others funcs as well sa we can define it in defaultMutationQueries()
    // onError(err,variables,recover){
    //     recover();
    // },
    ...defaultMutationOptions,
    ...options},
  )
}
//1-23-f- doing same thing for remove asd well
function useRemoveListItem(user, options) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {
    onMutate(removedItem){
        const previousItems = queryCache.getQueryData('list-items');
    
        queryCache.setQueryData('list-items',old => {
                return old.map(item => {
                    return old.filter(item => item.id !== removedItem.id)
                })
            })
            return () => queryCache.setQueryData('list-items',previousItems)
    },    
    ...defaultMutationOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  return useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItems,
  useListItem,
  useUpdatedListItem,
  useRemoveListItem,
  useCreateListItem,
}
