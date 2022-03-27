// 1-2-b- 🐨 you'll need the server
// 💰 the way that our tests are set up, you'll find this in `src/test/server/test-server.js`
import {server, rest} from 'test/server'
// 1-2-c- 🐨 grab the client
import {client} from '../api-client'

//1-6-e- import dependencies
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'

// const { client } = require("utils/api-client")

//1-6-c- we'll mock those modules
// this will turn all functions that those modules will expose into jest mock funcs
jest.mock('react-query')
jest.mock('auth-provider')

//1-2-f- grab the api_url
const apiURL = process.env.REACT_APP_API_URL

// 1-2-d- 🐨 add a beforeAll to start the server with `server.listen()`
beforeAll(() => server.listen())
// 1-2-e- 🐨 add an afterAll to stop the server when `server.close()`
afterAll(() => server.close())
// 1-2-h-🐨 afterEach test, reset the server handlers to their original handlers
// via `server.resetHandlers()`
afterEach(() => server.resetHandlers())
// 🐨 flesh these out:

//1-2-a- remove todo for all these tests and for 2nd param take async funcs there for async requests
// test.todo('calls fetch at the endpoint with the arguments for GET requests')
test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  //1-2-G- Make an special handler for this test
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  //it will fail since there is server not listening to this address
  //1-2-b- we need to import msw server and use it here goto testServer.js
  const result = await client(endpoint)

  expect(result).toEqual(mockResult)
})

// 🐨 add a server handler to handle a test request you'll be making
// 💰 because this is the first one, I'll give you the code for how to do that.
// const endpoint = 'test-endpoint'

// const mockResult = {mockValue: 'VALUE'}
// server.use(
//   rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
//     return res(ctx.json(mockResult))
//   }),
// )
//
// 🐨 call the client (don't forget that it's asynchronous)
// 🐨 assert that the resolved value from the client call is correct

// test.todo('adds auth token when a token is provided')
test('adds auth token when a token is provided', async () => {
  //1-3-b- create a fake token
  const token = 'FAKE_TOKEN'

  let request

  //1-3-a- copy the above test copy
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      //1-3-c- assign request to the req to get its value
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  //1-3-d- add token to the request
  await client(endpoint, {token})

  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})
// 🐨 create a fake token (it can be set to any string you want)
// 🐨 create a "request" variable with let
// 🐨 create a server handler to handle a test request you'll be making
// 🐨 inside the server handler, assign "request" to "req" so we can use that
//     to assert things later.
//     💰 so, something like...
//       async (req, res, ctx) => {
//         request = req
//         ... etc...
//
// 🐨 call the client with the token (note that it's async)
// 🐨 verify that `request.headers.get('Authorization')` is correct (it should include the token)

// test.todo('allows for config overrides')
test('allows for config overrides', async () => {
  let request

  //1-4-a- copy the above test copy
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    //1-4-b- use put func
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      //1-4-c- assign request to the req to get its value
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  //1-4-d- create custom config
  const customConfig = {
    method: 'PUT',
    headers: {'Content-Type': 'fake-type'},
  }

  //1-3-e- add custom config in your expectation to the request
  await client(endpoint, customConfig)
  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type'],
  )
})
// 🐨 do a very similar setup to the previous test
// 🐨 create a custom config that specifies properties like "mode" of "cors" and a custom header
// 🐨 call the client with the endpoint and the custom config
// 🐨 verify the request had the correct properties

// test.todo(
//   'when data is provided, it is stringified and the method defaults to POST',
// )

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  //1-5-a- copy the above test copy
  const endpoint = 'test-endpoint'

  server.use(
    //1-5-b- use post func
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body))
    }),
  )

  const data = {a: 'b', c: 'd'}

  //1-3-c- sent the request and save the data in result to check for data
  const result = await client(endpoint, {data})

  //1-3-d- check result to equal to data with assertion toEqual
  expect(result).toEqual(data)
})
// 🐨 create a mock data object
// 🐨 create a server handler very similar to the previous ones to handle the post request
//    💰 Use rest.post instead of rest.get like we've been doing so far
// 🐨 call client with an endpoint and an object with the data
//    💰 client(endpoint, {data})
// 🐨 verify the request.body is equal to the mock data object you passed



// 1-6- what happens if we have an error from async req we'll
//get logout functionality and queryCache will be cleared -  so testing this functionality
test('automatically logs out the user if a request returns a 401', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  //1-6-a- Make an special handler for this test and also add status as 401 in res
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult))
    }),
  )

  //1-6-b- we need to catch since this promise will fail to catch the error
  const result = await client(endpoint).catch(e => e)

  //1-6-d- expect error to match the error snapshot
  expect(result.message).toMatchInlineSnapshot(`"Please re-authenticate."`)

  //1-6-c- we also wanna expect that the queryCache is cleared and auth.logout is called out
  //but we don't have control over those modules so we'll mock those modules
  // this will turn all functions that those modules will expose into jest mock funcs
  // and know we can make assertions we can call. - goto starting of the file

  expect(queryCache.clear).toHaveBeenCalledTimes(1)

  expect(auth.logout).toHaveBeenCalledTimes(1)

  //1-6-e - last thing we need to do is import the keywords in this files
})


//1-7- what if req doesn't give 401 but req actually fails so res.ok will be false
//so testing it
test('correctly rejects the promise if there is an error', async () => {
  
const endpoint = 'test-endpoint'
const testError = {message: 'Test error'}

//1-7-a- Make an special handler for this test and also add status as 400 in res
server.use(
  rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
    return res(ctx.status(400), ctx.json(testError))
  }),
)

//1-7-b- we need to catch since this promise will fail to catch the error

// const error = await client(endpoint).catch(e => e)
//the above will work in false condition since the above server.use is sending the json and 
// res status but the promise itself is not gonna reject 
//so will use this below if false will get error as "Received promise resolved instead of rejected"

await expect(client(endpoint)).rejects.toEqual(testError);

// expect(error).toEqual(testError)
})

