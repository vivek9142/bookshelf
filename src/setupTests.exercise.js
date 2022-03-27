//1-8- all test setup - i.e, beforeAll,afterAll, beforeEach,etc
// are kept in setupTests which is included automatically configured by CRA
//so we can keep all these files in sepTests.exercise.js

//1-8-d- import server
import {server} from 'test/server';


// 1-8-a- 🐨 add a beforeAll to start the server with `server.listen()`
beforeAll(() => server.listen())
// 1-8-b- 🐨 add an afterAll to stop the server when `server.close()`
afterAll(() => server.close())
// 1-8-c-🐨 afterEach test, reset the server handlers to their original handlers
// via `server.resetHandlers()`
afterEach(() => server.resetHandlers())