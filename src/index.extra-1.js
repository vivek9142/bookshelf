//💯 adding modal through reach and addding event handlers to that

import '@reach/dialog/styles.css'
import * as React from 'react'
import ReactDOM from 'react-dom'
//1-2-a - import dialog for modal
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'

function App() {
  //1-2-c- deslaring state for opening and closing subsequent modals
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      {/* 1-2-b- adding dialog modal for login 
      1-2-d- adding state to it */}
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
      </Dialog>
      {/* 1-2-b- adding dialog modal for register
      1-2-d-  adding state to it */}
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
