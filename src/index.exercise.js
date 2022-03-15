//2- add styles to react components
//2-3- making home submit portal placed in the middle 

//2-3-c- also add this comment to jsx to work with css props\
//we can take other name than jsx and can be used by same import in jsx below
//ex - / jsx whatever /
//import { jsx as whatever } from '@emotion/core';
/** @jsx jsx */

// 2-3-b- 🐨 make sure to add the comment and import jsx from @emotion/core
// up here so you can use the css prop
//so by this it will use jsx('div',{css:{}}) instead of React.createelement('div')
import { jsx } from '@emotion/core';

// 2-1-a- 🐨 let's get a solid reset of global styles so everything looks a bit better
// In this project we're using bootstrap-reboot which you can import from

import 'bootstrap/dist/css/bootstrap-reboot.css';

// 🦉 Note: you can definitely use regular styles to style React apps
// and using any modern toolchain will allow you to simply import the CSS file
// but CSS-in-JS is generally easier to maintain.

//2-1-c will continue in lib.exercise.js

import '@reach/dialog/styles.css'
import * as React from 'react'
import ReactDOM from 'react-dom'

// 2-1-b- 🐨 you'll need to import some new components that you'll be creating
// in this file
import {Button, Input, FormGroup} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'

//2-6-f- import spinner and use it beside login button
import { Spinner } from 'components/lib.exercise6';

function LoginForm({onSubmit, submitButton}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  // 2-3-a- 🐨 this <form> could use a css prop
  //but when we inspect the form tag in devtools you'll get object object so its
  //not converted to css props so we need to include jsx and add comments also 
  // 🎨
  //    display: 'flex',
  //    flexDirection: 'column',
  //    alignItems: 'stretch',
  //    '> div': {
  //      margin: '10px auto',
  //      width: '100%',
  //      maxWidth: '300px',
  //    },
  return (
    <form css={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
     '> div': {
       margin: '10px auto',
       width: '100%',
       maxWidth: '300px',
     },
    }} onSubmit={handleSubmit}>
      {/* 🐨 these div elements could be a FormGroup you create in components/lib */}
      {/* 🐨 and the inputs elements could be custom styled Input components too */}
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>{React.cloneElement(submitButton, {type: 'submit'})}
      {/* 2-6-g- adding Spiner and add acessibility props */}
      {/* <Spinner aria-label='loading'/> */}
      {/* //2-6-h we can make accessiblity as default prop */}
      <Spinner />
      </div>
    </form>
  )
}

function App() {
  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  // 2-3-d- 🐨 this div could use a css prop to get its children rendered nicer
  // 🎨
  //    display: 'flex',
  //    flexDirection: 'column',
  //    alignItems: 'center',
  //    justifyContent: 'center',
  //    width: '100%',
  //    height: '100vh',
  return (
    <div css={{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
     width: '100%',
     height: '100vh',
    }}>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      {/*
        🐨2-3- e-  the two buttons are too close, let's space them out
          🎨 apply this to the div right below
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridGap: '0.75rem',
      */}
      {/* 2-1-e-🐨 And make sure to use the new Button component for all these buttons */}
      <div css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gridGap: '0.75rem',
      }}>
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              // 2-1-f-addiing variant for differenct styles and use this prop for styling in lib file
              submitButton={<Button>Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
