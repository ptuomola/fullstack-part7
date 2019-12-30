import React from 'react'
import { connect } from 'react-redux'
import { getBlogForId } from '../reducers/blogReducer.js'
import { like, remove } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'

const Blog = withRouter((props) => {
  const blog = props.blog
  const user = props.user

  if(blog === undefined)
    return null

  const handleLike = (blog, event) => {
    event.stopPropagation()
    props.like(blog)
  }

  const handleRemove = (blog, event) => {
    event.stopPropagation()

    if(!window.confirm('remove blog ' + blog.title + ' by ' + blog.author))
      return

    props.remove(blog)
    props.history.push('/')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes <button onClick={(event) => handleLike(blog, event)}>like</button><br/>
      added by {blog.user.name}<br/>
      { user.username === blog.user.username ?
        <button onClick={(event) => handleRemove(blog, event)}>remove</button>
        : '' }
      <p/>
      <b>comments</b>
      <ul>
        { blog.comments.map(comment => <li key={comment}>{comment}</li>) }
      </ul>
    </div>
  )
})

const mapStateToProps = (state, props) => {
  return {
    blog: getBlogForId(state, props.blogId),
    user: state.user
  }
}

export default connect(mapStateToProps, { like, remove })(Blog)
