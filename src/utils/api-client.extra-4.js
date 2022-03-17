//1-4- if user tries to open non-authorized pages so they will be given 401 status 
//so here we're logging the users who tries to open non-authorized pages 

//1-5- make it so that api client can send the data and sent the data along to the backend for POST req
// that are sending the data so that user can interact with the backend so now user can 
//also make authenticated requests and also requests with data along with them

import * as auth from 'auth-provider'
const apiURL = process.env.REACT_APP_API_URL

function client(
  endpoint,
  //1-5-b- add data atribute here
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    //1-5-b- if data present so make the request as POST else GET
    method: data ? 'POST' : 'GET',
    //1-5-c- if data is present so stringify data else its undefined
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      //1-5-d- if data ispresent then add app/json as content type
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    //1-4-a- response.status will check for it
    if (response.status === 401) {
      //1-4-b- logging out the user
      await auth.logout()
      // 1-4-c- refresh the page for them
      window.location.assign(window.location)
      //1-4-d- reject the promise for full security
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
