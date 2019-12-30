import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogRow = (props) => {
  const blog = props.blog

  return (
    <div>
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
