import userService from '../services/users.js'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export const getUserForId = (state, userId) => {
  return state.users.find(val => val.id === userId)
}

const reducer = (state = [], action) => {
  switch(action.type)
  {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default reducer
