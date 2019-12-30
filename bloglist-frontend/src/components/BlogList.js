import React from 'react'
import { connect } from 'react-redux'
import BlogRow from './BlogRow'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'

const BlogList = (props) => {
  const blogs = props.blogs
  const newNoteRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel="create new" ref={newNoteRef}>
        <CreateBlog newNoteRef={newNoteRef}/>
      </Togglable>
      {blogs.map(blog => <BlogRow key={blog.id} blog={blog} />)}
    </div>
  )
}

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const mapStateToProps = (state) => {
  return {
    blogs: sortBlogs(state.blogs)
  }
}

export default connect(mapStateToProps, { })(BlogList)
