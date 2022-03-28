
import React from 'react';

//1-1-c- import render and screen
//1-1-i- import within to scope some queries down to this modal
import {render,screen,within} from '@testing-library/react';
// 1-1-d- 🐨 you're gonna need this stuff:
import {Modal, ModalContents, ModalOpenButton} from '../modal'

//1-1-h- import userEvent for events
import userEvent from '@testing-library/user-event'


// const { render } = require("@testing-library/react");

//1-1-a- remove todo and start writing test case
// test.todo('can be opened and closed')
// 🐨 render the Modal, ModalOpenButton, and ModalContents
// 🐨 click the open button
// 🐨 verify the modal contains the modal contents, title, and label
// 🐨 click the close button
// 🐨 verify the modal is no longer rendered
// 💰 (use `query*` rather than `get*` or `find*` queries to verify it is not rendered)


test('can be opened and closed',()=>{
    const label='Modal Label'
    const title = 'Modal Title'
    const content = 'Modal Content'

    //1-1-b- copy the html elements from unauth.app return
    render(
        <Modal>
          <ModalOpenButton>
              {/* 1-1-e- we can replace Button with button with no prop */}
           <button>Open</button>
          </ModalOpenButton>
          {/* 1-1-g- add aria label as Modal Label  and title is Modal Title*/}
          <ModalContents aria-label={label} title={title}>
            {/* 1-1-f- remove the login form comp and add normal div */}
            {/* <LoginForm
              onSubmit={login}
              submitButton={<button variant="primary">Login</button>}
            /> */}
            <div>{content}</div>
          </ModalContents>
        </Modal>
    )
    userEvent.click(screen.getByRole('button',{name: /open/i}))

    const modal = screen.getByRole('dialog');
    //1-1-j- it will give error toHaveAttribute is not defined so we need to 
    //import JestDom in setupTests
    expect(modal).toHaveAttribute('aria-label',label)

    //next we need to scope some queries within the modal . its just like screen except all 
    //the queries in the modal are scoped just to that modal component and won't be able to access outside 
    //it
    const inModal = within(modal);
    expect(inModal.getByRole('heading',{name:title})).toBeInTheDocument()
    expect(inModal.getByText(content)).toBeInTheDocument();

    userEvent.click(inModal.getByRole('button',{name:/close/i}))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    screen.debug();
});