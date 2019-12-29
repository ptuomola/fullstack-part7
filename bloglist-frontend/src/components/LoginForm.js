import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField, filterAttr } from '../hooks'

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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...filterAttr(username)} />
        </div>
        <div>
          password
          <input {...filterAttr(password)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { loginUser })(LoginForm)