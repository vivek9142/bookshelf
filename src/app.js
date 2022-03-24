// export * from './app.final'

export * from './app.exercise'

// 💯 create an `AuthProvider` component
// export * from './app.extra-2'

// 💯 colocate global providers
// export * from './app.extra-3'


//1-1- we're currently passing all props from parnet comp to child
//comp so now we'll use context to get rid of this prop drilling
//prob - goto app.exercise

//1-2- goto books.ex and update the user with accessing context

//1-3- goto listitems.ex.js and update the queries with user context

//1-4- remake refetchBookSearchQuery with hooks to remove its dependency with user in Discover.ex.js

//app.extra-1 - no need to call the context anduse it we can make hook out of it and use it wherever we can
// goto authContext.extra1.js


//app.extra-2 💯 create an `AuthProvider` component goto app.extra-2.js
//copy all the data most of App.exercise.js data into context module

//app.extra-3 there is a logic for colocating our context provider place.creating a single comp fore mgmnt of all 
//global providers - goto index.extra-3.js here they have taken all providers and added them alongn
//with Router as well. 

//app.extra4 - there is a need for app to import user from authContext. there is a way 
//we can make a client app can authenticate by itself