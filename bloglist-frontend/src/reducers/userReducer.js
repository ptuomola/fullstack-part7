import blogService from '../services/blogs'
import loginService from '../services/login'
import { showSuccess, showError } from './notificationReducer'

const initialState = null

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(showSuccess('login successful', 5))
    } catch (exception) {
      dispatch(showError('wrong username or password', 5))
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(unsetUser())
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(showSuccess('logged out', 5))
  }
}

export const unsetUser = () => {
  return {
    type: 'UNSET_USER'
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
  case 'SET_USER':
    return action.data
  case 'UNSET_USER':
    return null
  default:
    return state
  }
}

export default reducer