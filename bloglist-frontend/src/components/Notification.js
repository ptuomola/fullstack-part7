import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.notification.message
  const isError = props.notification.isError

  if (message === '')
  {
    return null
  }

  if(isError)
  {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else
  {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
