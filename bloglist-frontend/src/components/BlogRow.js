import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogRow = (props) => {
  const blog = props.blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    blog: props.blog
  }
}

export default connect(mapStateToProps)(BlogRow)
