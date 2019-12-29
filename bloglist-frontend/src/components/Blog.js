import React, { useState } from 'react'
import { connect } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const [showDetail, setShowDetail] = useState(false)
  const blog = props.blog
  const user = props.user

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const handleLike = (blog, event) => {
    event.stopPropagation()
    props.like(blog)
  }

  const handleRemove = (blog, event) => {
    event.stopPropagation()

    if(!window.confirm('remove blog ' + blog.title + ' by ' + blog.author))
      return

    props.remove(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="clickableRow" onClick={() => toggleDetail()}>
        {blog.title} {blog.author}
        { showDetail ?
          <div>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button onClick={(event) => handleLike(blog, event)}>like</button><br/>
            added by {blog.user.name}<br/>
            { user.username === blog.user.username ?
              <button onClick={(event) => handleRemove(blog, event)}>remove</button>
              : '' }
          </div>
          : <div></div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(null, { like, remove })(Blog)
