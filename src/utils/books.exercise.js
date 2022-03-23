//1-11- we have copy pasted the queries all over the place so we'll abstract these queries and use them in our app
//we'll copy the queries from discover.ex.js into books.exercise.js and make an custom hook out of it.

//1-11-b-  import useQuery
import { useQuery } from "react-query";
import { client } from "./api-client.exercise";
//1-11-f- add loading books obj entity and import its svg
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


//1-11-c- add custom hook and move the query into here
function useBookSearch(query,user){
    //1-11-a- paste the data query for search in here
    const result = useQuery({
        queryKey: ['bookSearch',{query}],
        queryFn:() => client(`books?query=${encodeURIComponent(query)}`,{
          token:user.token
        }).then(data => data.books)
      })
      
      //1-11-e- add return stmt and add book as in the return obj separately if not present so loading Book should be
      //present
      return {...result,books:result.data ?? loadingBooks};
}


//1-11-g- refactor the discover ex js page (refactor page in discover-refactor.js)


//1-12- well copy the queries from book.ex.js into books.exercise.js and make an custom hook out of it.

//1-12-b- create a custom hook outof it
function useBook(bookId,user){
    //1-12-a-  copy paste book get query here 
    const {data} = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () =>
          client(`books/${bookId}`, {token: user.token}).then(data => data.book),
      });

      //1-12-c- return data if not return loadingBook entity obj
      return data ?? loadingBook
}
//1-11-d- refactor the book.exercise.js page (refactor page in book-refactor.js)


export {useBookSearch,useBook}