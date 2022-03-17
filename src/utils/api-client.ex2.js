


    function client(endpoint, customConfig = {}) {
        // 1-2-d- 🐨 create the config you'll pass to window.fetch
        //    make the method default to "GET"
        const config = {
            method: 'GET',
            ...customConfig,
        }
        // 💰 if you're confused by this, that's fine. Scroll down to the bottom
        // and I've got some code there you can copy/paste.
        // 🐨 1-2-c- call window.fetch(fullURL, config) then handle the json response
        // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // 💰 here's how to get the full URL: `${process.env.REACT_APP_API_URL}/${endpoint}`

        //1-02-e - replace customConfig with config
        return window.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
        .then(response => response.json())
      }
      
      export {client}
      
      /*
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      💰 spoiler alert below...
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const config = {
          method: 'GET',
          ...customConfig,
        }
      */
      