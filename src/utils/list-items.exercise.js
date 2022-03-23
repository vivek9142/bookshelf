//1-13- take all the place where we're getting the list item looking for specific ones and convert 
//these into two hooks 
//1- to get all the list items
//2- that reuses that same hook and finds a specific item by id -goto book-row.exercise

//1-14 - take the mutate logic of note in book specific page and abstract it in list-items.exercise -- goto book.ex.js


//1-16 - make custom hooks for remove and create for listItems in listItems.exercise.js 
 //refactored- in status-buttons.refactor.js


 //1-19 - on click of mark as read on req failure we're not getting errors
 // so we have useAsync,run for catching up errors but the reacxt query is swallowing up
 //the query failure and not sendig them to useAsync and run func. 
// so we need to pass the extra obj in query for throwing errors.

// import dependencies
import {useQuery,useMutation,queryCache} from 'react-query';
import {client} from './api-client';

//1-13-b- make custom hook 
function useListItems(user){
    //1-13-a - copy the whole query along with filtering thedata functionality part n paste here
    const {data:listItems} = useQuery({
        queryKey: 'list-items',
        queryFn: ()=> client('list-items',{token:user.token}).then(data => data.listItems)
      });

      //1-13-c - return listItems
      return listItems ?? []
} 

//1-13-d-make a custom hook and call above function to get all listItems and use this to get specific listitem 
function useListItem(user,bookId){
    const listItems = useListItems(user);
     return listItems.find(li => li.bookId === bookId) ?? null;
}

//1-16-d- same onSettled Obj is used here so we're abstracting these as well
const defaultMutationOptions = {
    onSettled: ()=> queryCache.invalidateQueries('list-items')
}




//1-13-e- refactor the book-row.exercise.js page (refactor page in book.row-refactor.js)
//1-13-e- refactor the list-item-list.exercise.js page (refactor page in list-item-list.refactor.js)


//1-14-b- make custom logic
//1-19 - a - add options in hook and also in 2nd param of useMutations, use this on update,remove 
//and create

function useUpdatedListItem(user,options){
    //1-14-a - copy the mutate lgic from book.ex.js and paste here
    return useMutation(
        (updates)=> client(`list-items/${updates.id}`,{method:'PUT',data: updates,token:user.token}),
        // onSettled: ()=> queryCache.invalidateQueries('list-items')
        //1-19-b - add obj options here
        {...defaultMutationOptions,...options}
      )
}//1-14-c-go to refactor  - book-refactor.js





//1-16-a- copy that queries from status-buttons.ex.js and paste here and make custom hooks here
function useRemoveListItem(user,options){
    return useMutation(
        ({id})=> client(`list-items/${id}`,{method:'DELETE',token:user.token}),
        // onSettled: ()=> queryCache.invalidateQueries('list-items')
        {...defaultMutationOptions,...options}
      )
}


function useCreateListItem(user,options){
    return useMutation(
        ({bookId})=> client('list-items',{data:{bookId},token:user.token}),
        // onSettled: ()=> queryCache.invalidateQueries('list-items')
        {...defaultMutationOptions,...options}
    )
}



export {useListItems,useListItem,useUpdatedListItem,useRemoveListItem,useCreateListItem};

