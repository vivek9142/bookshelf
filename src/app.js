// export * from './app.final'

export * from './app.exercise'

//1-2- if an list item is already list in mylist so we need not to show 
//add to list item but add delete item functionality 

//1-3-remove an listr item of books

//1-4- if list item is htere and we want to mark the list item as read 

//1-5- if a list item is present in list we show the rating if the book has been read  -goto book-row-ex

//1-6- implement full rating feature - go to rating.exercise

//1-7- update the search feature with react query as well - goto discover.exercise

//1-8- using react query to load info for specific book and add rating and note textarea - go to book.exercise

//1-9 - we need to add list items to finished list and reading list goto list-item-list.ex.js 

//1-10 - if the user logs out the application so we need to clear the book list items here so 
//another user don't use it or data is present indefinately - go to app.ex.js

//1-11- we have copy pasted the queries all over the place so we'll abstract these queries and use them in our app
//we'll copy the queries of discover.exercise.js into books.exercise.js(utils directory) 
//and make an custom hook out of it.

//1-12- copy the queries of book.exercise.js into books.exercise.js(utils directory) 
//and make an custom hook out of it.

//1-13- take all the place where we're getting the list item looking for specific ones and convert 
//these into two hooks 
//1- to get all the list items
//2- that reuses that same hook and finds a specific item by id -goto list-items.exercise

//1-14 - take the mutate logic of note in book specific page and abstract it in list-items.exercise


//1-15 - refactor status -buttons ex.js code with custom hooks-- status-buttons.refactor.js,rating.refactor.js


 //1-16 - make custom hooks for remove and create for listItems in listItems.exercise.js 
 //refactored- in status-buttons.refactor.js


 //1-17- if we go to a book which don't exist here ex - not-a-book then it will loading for infinitely- so need to set error 
 //boundary for this - go to index.exercise.js


 //1-18- show error on notepad area on request failure of book.ex-18.js,rating.ex-18.js


 //1-19 - on click of mark as read on req failure we're not getting errors
 // so we have useAsync,run for catching up errors but the reacxt query is swallowing up
 //the query failure and not sendig them to useAsync and run func. 
// goto  - list-items.ex.js and status-buttons.refactor.js

//1-20 - while we're typing in notepad in book.ex-18.js we dont get notification that it is saved

//1-21- while add the list in the reading list we're getting some refetching after moving out and refetching the same 
//list - goto Discover-refactor.js and books.exercise-21.js

//1-22 - while going to all books we need to cache the specific book as well  -  
//we cached the books in booksearch,not in book query key, we're looking for book in book key while
//all data is present in booksearch so we'll add all books to book key query - goto books.exercise-21.js,list-items.exercise.js

//1-23- we don't need to wait for rating,notesand mark as read to 
// be updated we can do this by react query