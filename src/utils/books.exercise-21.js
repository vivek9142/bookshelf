
//1-21- while add the list in the reading list we're getting some refetching after moving out and refetching the same 
//list - so we're removing the cache and prefetching the list items.

import { useQuery,queryCache } from "react-query";
import { client } from "./api-client.exercise";
import bookPlaceholderSvg from 'assets/book-placeholder.svg';

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

  //1-21-f- create new function for refactor the duplicated code used
  const getBookSearchConfig = (query,user) =>({
    queryKey: ['bookSearch',{query}],
        queryFn:() => client(`books?query=${encodeURIComponent(query)}`,{
          token:user.token
        }).then(data => data.books)
  })

  //1-21-g - using the same function created above for refactoring

// function useBookSearch(query,user){
//     const result = useQuery({
//         queryKey: ['bookSearch',{query}],
//         queryFn:() => client(`books?query=${encodeURIComponent(query)}`,{
//           token:user.token
//         }).then(data => data.books)
//       })
      
//       return {...result,books:result.data ?? loadingBooks};
// }

function useBookSearch(query,user){
  const result = useQuery(getBookSearchConfig(query,user))
    
    return {...result,books:result.data ?? loadingBooks};
}

function useBook(bookId,user){
    const {data} = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () =>
          client(`books/${bookId}`, {token: user.token}).then(data => data.book),
      });

      return data ?? loadingBook
}

//1-21-g - using the same function created above for refactoring

//1-21-c- declare function refetchBookSearchQuery
//1-21-e - here same code is used so refactoring this with new function 
// function refetchBookSearchQuery(user){
//   queryCache.removeQueries('bookSearch');
//   //1-21-d- prefetch the query again
//   queryCache.prefetchQuery({
//     queryKey: ['bookSearch',{query:''}],
//     queryFn:() => client(`books?query=${encodeURIComponent('')}`,{
//       token:user.token
//     }).then(data => data.books)
//   })
  
// }

function refetchBookSearchQuery(user){
  queryCache.removeQueries('bookSearch');
  //1-21-d- prefetch the query again
  queryCache.prefetchQuery(getBookSearchConfig('',user))
  
}

export {useBookSearch,useBook,refetchBookSearchQuery}