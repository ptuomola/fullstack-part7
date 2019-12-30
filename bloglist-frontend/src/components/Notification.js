import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

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
      <Alert variant="danger">
        {message}
      </Alert>
    )
  }
  else
  {
    return (
      <Alert variant="success">
        {message}
      </Alert>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
