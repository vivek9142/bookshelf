//1-1-a- 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
//1-4-e - we need to pass this books and user to url so buildUser and buildBook is a random book and user generator.
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

//1-6 🐨 after each test, clear the queryCache and restore the provider to logout 
//state by auth.logout
afterEach(async ()=> {
    queryCache.clear()
    await auth.logout()
});

test('renders all the book information',async ()=>{
const user = buildUser();

//1-3-a- another method to trick the app to let it know that user is logged in by adding token in localStorage
//🐨 "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value (can be anything for now)
window.localStorage.setItem(auth.localStorageKey,'SOME_FAKE_TOKEN');
//WE'LL GET some error since we're making a network request but we're not handling that network request
//so we need to do window.fetch
//1-4-f-  🐨 create a book use `buildBook`
const book = buildBook()

//  1-4-a- 💰 window.history.pushState({}, 'page title', route)
//   📜 https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
//1-4-g- add book.id as in the id of book
// window.history.pushState({}, 'Test Page' , `/book/1234567`)
window.history.pushState({}, 'Test Page' , `/book/${book.id}`)

const originalFetch = window.fetch
window.fetch = async (url,config) => {
    if(url.endsWith('/bootstrap')){
        //1-4-c- pass auth in json
        return {
            ok:true,
            json:async () => 
            ({user:{...user,token:'SOME_FAKE_TOKEN'},listItems:[]})
        }
    } 
    //1-4-d- now we need to handle books page 
    // else if(url.endsWith(`/books/1234567`)){
    else if(url.endsWith(`/books/${book.id}`)){
        return {
            ok:true,
            json:async () => 
            ({book})
        }
    }
    //1-4-b- after pushing state and logging here we're getting auth as undefined so
    //we need to pass authorization in return json 
    console.log(url,config)
    return originalFetch(url,config)
}

//🐨 create a user using `buildUser`

// 🐨 update the URL to `/book/${book.id}`


// 🐨 reassign window.fetch to another function and handle the following requests:
// - url ends with `/bootstrap`: respond with {user, listItems: []}
// - url ends with `/list-items`: respond with {listItems: []}
// - url ends with `/books/${book.id}`: respond with {book}
// 💰 window.fetch = async (url, config) => { /* handle stuff here*/ }
// 💰 return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})

//1-1-b- render App but here you'll get an error that useAuth must be used within AuthProvider
// render(<App/>);

// 1-1-c- so we need to wrap the app with appproviders but in order to use it again 
// we need to assign it to new var and use the wrapping of provider with app when using it again
//🐨so quick work-around is to render the App component and set the wrapper to the AppProviders
// since here in the app AppProvider takes all the children as an prop and forward it to all Providers.
// (that way, all the same providers we have in the app will be available in our tests)
render(<App/>,{wrapper:AppProviders});


// 1-2-a- 🐨 use waitFor to wait for the queryCache to stop fetching and the loading
// indicators to go away
// 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitfor
// 💰 if (queryCache.isFetching  or there are loading indicators) then throw an error...
//we're wating for loading screen to go away so using waitForElementToBeRemoved
await waitForElementToBeRemoved(()=> screen.getByLabelText(/loading/i))


//1-1-d- we're getting the spinner screen when we're debug after wrapping the AuthProviders 
screen.debug();
// 1-5-a- 🐨 assert the book's info is in the document
expect(screen.getByRole('heading',{name:book.title})).toBeInTheDocument();
expect(screen.getByText(book.author)).toBeInTheDocument();
expect(screen.getByText(book.publisher)).toBeInTheDocument();
expect(screen.getByText(book.synopsis)).toBeInTheDocument();
expect(screen.getByRole('img', {name:/book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl
);
expect(screen.getByRole('button',{name:/add to list/i})).toBeInTheDocument();
//getByRole will throw an error  for elements not present in dom for this we need to check with queryByRole
expect(screen.queryByRole('button',{name:/remove to list/i})).not.toBeInTheDocument();
expect(screen.queryByRole('button',{name:/remove to list/i})).not.toBeInTheDocument();
expect(screen.queryByRole('button',{name:/mark as read/i})).not.toBeInTheDocument();
expect(screen.queryByRole('button',{name:/mark as unread/i})).not.toBeInTheDocument();
expect(screen.queryByRole('textarea',{name:/notes/i})).not.toBeInTheDocument();
expect(screen.queryByRole('radio',{name:/star/i})).not.toBeInTheDocument();
expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument();

})