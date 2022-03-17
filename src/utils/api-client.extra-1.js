function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      //1-3-a if resp is ok ie, it is true then return data else return rejected promise.
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}
