const initialState = {
  message: '',
  isError: false
}

export const showError = (notification, timeout) => {
  return async dispatch => {
    setTimeout(() => dispatch(removeNotification()), timeout * 1000)
    dispatch({
      type: 'SET_ERROR',
      data: notification
    })
  }
}

export const showSuccess = (notification, timeout) => {
  return async dispatch => {
    setTimeout(() => dispatch(removeNotification()), timeout * 1000)
    dispatch({
      type: 'SET_SUCCESS',
      data: notification
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'UNSET'
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
  case 'SET_ERROR':
    return {
      isError: true,
      message: action.data
    }
  case 'SET_SUCCESS':
    return {
      isError: false,
      message: action.data
    }
  case 'UNSET':
    return {
      isError: false,
      message: ''
    }
  default:
    return state
  }
}

export default reducer