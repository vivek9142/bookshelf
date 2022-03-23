//1-10 - c- if user tries ot do an unauthenticated req so we need ot invalidate it go to - api-client-ex.js

// 1-10-c- 🐨 get the queryCache from 'react-query'
import {queryCache} from 'react-query';
import * as auth from 'auth-provider'
const apiURL = process.env.REACT_APP_API_URL

async function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      // 1-10-d - 🐨 call queryCache.clear() to clear all user data from react-query
      queryCache.clear();
      
      await auth.logout()
      // refresh the page for them
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
