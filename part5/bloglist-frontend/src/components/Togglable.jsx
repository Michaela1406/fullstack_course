// Exercise 5.5 Blog List Frontend, step 5
import { useState, useImperativeHandle} from 'react'
import { TextField, Button  } from '@mui/material'

const Togglable = props => {
  const [visible, setVisible] = useState(false)

  //console.log('Togglable, visible: ', visible)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
      <Button type="cancel" variant="outlined" style={{ marginTop: 10 }} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type="cancel" variant="outlined" style={{ marginTop: 10 }} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

export default Togglable