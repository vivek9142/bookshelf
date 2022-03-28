//1-2-a- 🐨 instead of React Testing Library, you'll use React Hooks Testing Library
import {renderHook, act} from '@testing-library/react-hooks'
//1-2-b- 🐨 Here's the thing you'll be testing:
import {useAsync} from '../hooks'

// 1-5-d- 💰 I'm going to give this to you. It's a way for you to create a promise
// which you can imperatively resolve or reject whenever you want.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// Use it like this:
// const {promise, resolve} = deferred()
// promise.then(() => console.log('resolved'))
// do stuff/make assertions you want to before calling resolve
// resolve()
// await promise
// do stuff/make assertions you want to after the promise has resolved

//1-10-g- add beforeEach and afterEach for jest spyOn and jest reset
beforeEach(() => {
  jest.spyOn(console, 'error')
})

afterEach(() => {
  console.error.mockRestore()
})

// 🐨 flesh out these tests
test('calling run with a promise which resolves', async () => {
  // 1-3-a- 🐨 get a promise and resolve function from the deferred utility
  // 🐨 use renderHook with useAsync to get the result
  // 🐨 assert the result.current is the correct default state

  const {result} = renderHook(() => useAsync())
  //1-5-c- we need to create custom function out of this rpomise handling
  // //1-3-b- create promise and assign its res and rej valuesto outsite resolve,reject
  // let resolve,reject;

  // const promise = new Promise((res,rej) => {
  //     resolve = res;
  //     reject = rej;
  // })
  //1-5-e- call the deferred func to get res,rej,promise
  const {promise, resolve} = deferred()

  //1-2-a- we'll get all the funcs and values returning out of useAsync
  //so we'll use  result.current to get the values which we expect and function we can use assertion
  //to detect any function is assigned to it.
  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  // 1-3-a- 🐨 call `run`, passing the promise
  //    (💰 this updates state so it needs to be done in an `act` callback)
  // 🐨 assert that result.current is the correct pending state
  //we'll get the error  -     ^
  //1-3-b- `The argument passed to useAsync().run must be a promise.
  //Maybe a function that's passed isn't returning anything?`, so we need to pass promise here in run
  //   result.current.run(promise)

  //1-3-c-When testing, code that causes React state updates should be wrapped into act(...):
  /* assert on the output.The side effects of app should be flushedbefore we continue rest of our tests.
    This ensures that you're testing the behavior 
  the user would see in the browser.*/
  //   act(()=> {
  //     result.current.run(promise)
  //   })

  //1-4-b- create a var and assign its value inside act to run func
  let p
  act(() => {
    p = result.current.run(promise)
  })

  // 1-3-e- 🐨 call resolve and wait for the promise to be resolved
  //    (💰 this updates state too and you'll need it to be an async `act` call so you can await the promise)
  // 🐨 assert the resolved state
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'pending',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  //1-4-a- add resolve to get the data now. but we need to enclode it in act so
  //side effect,state update and promise resolvution had been taken place. then we can test the app
  //also we need to make act as async func and we need to take the run promise in a variable
  //so that we kniow when it resolves so we can move to our tests

  //1-4-c- data is came as undefined since we haven't passed any data to compare it with expected.
  // so we'll pass some symbol with some value and use it for comparison
  const resolvedValue = Symbol('resolved value')

  await act(async () => {
    resolve(resolvedValue)
    await p
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: resolvedValue,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  // 1-5-a🐨 call `reset` (💰 this will update state, so...)
  // in the last here we need to reset the state and assert ot test it
  // and we need to enclose it in act.

  act(() => {
    result.current.reset()
  })
  // 1-5-b- 🐨 assert the result.current has actually been reset
  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('calling run with a promise which rejects', async () => {
  //1-6- same as previous test but it is a reject test taking the reject out of promise
  //1-6-a- copy the whole previous test
  const {result} = renderHook(() => useAsync())

  //1-6-b-take reject out of deferred
  const {promise, reject} = deferred()

  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  let p
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'pending',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
  //1-6-c- replce resolvedvalue with reject value
  const rejectedValue = Symbol('resolved value')

  //1-6-d- reject the promise and catch the eror and ignore it
  await act(async () => {
    reject(rejectedValue)
    await p.catch(() => {
      //ignore error
    })
  })

  //1-6-e- replce resolved to reject
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: rejectedValue,
    status: 'rejected',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  act(() => {
    result.current.reset()
  })
  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})
// 🐨 this will be very similar to the previous test, except you'll reject the
// promise instead and assert on the error state.
// 💰 to avoid the promise actually failing your test, you can catch
//    the promise returned from `run` with `.catch(() => {})`

test('can specify an initial state', async () => {
  //1-7-a- make initialSatte and mockData
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}

  //1-7-b- execute useAsync and assign its value to result
  const {result} = renderHook(() => useAsync(customInitialState))

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: mockData,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})
// 💰 useAsync(customInitialState)

test('can set the data', async () => {
  //1-8-a- make mockData
  const mockData = Symbol('resolved value')

  //1-8-b- execute useAsync and assign its value to result
  const {result} = renderHook(() => useAsync())

  //1-8-c- execute the setData func and use act here
  act(() => {
    result.current.setData(mockData)
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: mockData,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})
// 💰 result.current.setData('whatever you want')

// 💰 result.current.setError('whatever you want')
test('can set the error', async () => {
  //1-9-a- make mockError
  const mockError = Symbol('rejected value')

  //1-9-b- execute useAsync and assign its value to result
  const {result} = renderHook(() => useAsync())

  //1-9-c- execute the setError func and use act here
  act(() => {
    result.current.setError(mockError)
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: mockError,
    status: 'rejected',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

//1-10- we have noticed safeSetState calls which is comming from useSafeDispatch
//which ensures our app doesnt do state update when our app is unmounted
test('No state updates happen if the component is unmounted while pending', async () => {
  // 💰 const {result, unmount} = renderHook(...)
  // 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)

  //1-10-d- spy on console.error
  // jest.spyOn(console,'error');

  //1-10-a- create promise and take result from runing useAsync funcs as usual
  const {promise, resolve} = deferred()
  //1-10-c- so we'll take unmount from below call.
  const {result, unmount} = renderHook(() => useAsync())

  let p

  act(() => {
    p = result.current.run(promise)
  })

  // 1-10-b- after act here we need to unmount useAsync while the promise is running
  unmount()
  await act(async () => {
    resolve()
    await p
  })

  /*1-10-c- when running this test we'll run the setState instead of setSafeState so it will give
error in console so we'll spy on console.error through jest and we'll check if we get any errors 
so test is failing else passing
*/
  expect(console.error).not.toHaveBeenCalled()
  //1-10-e- reset the spyon jest func so it not spies after this test
  // console.error.mockRestore();

  //1-10-f- we're adding spyOn and reset jest func in beforeEach() and afterEach()
  //so it can spy in each test case
})
test('calling "run" without a promise results in an early error', async () => {
  const {result} = renderHook(() => useAsync())
  //we can do snapshots for error messages
  expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`
  )
})
