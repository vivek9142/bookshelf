//2-4- changing react components  name and make it less cluttered in react dev tools

//2-4-b- with help of macro emotion it can create custom displayname taking name of comp
// without it we need to manually create name of cmop with displayName property.
// import styled from '@emotion/styled'

//2-5- importing styles and media queries from directory and using in place of static colors and queries
//2-5-a- import styles and media queries
import * as colors from 'styles/colors';
import * as mq from 'styles/media-queries';

import styled from '@emotion/styled/macro'
import {Dialog as ReachDialog} from '@reach/dialog'

const buttonVariants = {
  primary:{
    // background: '#3f51b5',
    // color: 'white',
    background: colors.indigo,
    color: colors.base,
  },
  secondary:{
  background: colors.gray,
  color: colors.text,
  }
}

const Button = styled.button({
    padding: '10px 15px',
  border: '0',
  lineHeight: '1',
  borderRadius: '3px',
}, ({variant='primary'}) => buttonVariants[variant])



//2-4-a - changing the displayName of button and using it so we dont need to see the child elements
//So this will be displayed in react dev tool as comp 
// Button.displayName = 'MY_SUPER_COOL_BUTTON'

const Input = styled.input({
  borderRadius: '3px',
  border: `1px solid ${colors.gray10}`,
  background: colors.gray,
  padding: '8px 12px',
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  // 2-5- c - replacing media queries with dynamic named mq
  // '@media (max-width: 991px)': {
  //   width: '100%',
  //   margin: '10vh auto',
  // },

  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

export {CircleButton, Dialog,Button,Input,FormGroup}
