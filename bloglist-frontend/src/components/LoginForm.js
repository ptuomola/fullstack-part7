import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField, filterAttr } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.loginUser(username.value, password.value)
    username.reset()
    password.reset()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control {...filterAttr(username)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control {...filterAttr(password)} />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { loginUser })(LoginForm)