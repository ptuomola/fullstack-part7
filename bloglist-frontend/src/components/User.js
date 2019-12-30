import React from 'react'
import { connect } from 'react-redux'
import { getUserForId } from '../reducers/usersReducer.js'

const User = (props) => {
  const user = props.user

  if(user === undefined)
    return null

  return (
    <div>
      <h2>{user.name}</h2>
      <p><b>added blogs</b></p>
      <ul>
        { user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    user: getUserForId(state, props.userId),
  }
}

export default connect(mapStateToProps)(User)
