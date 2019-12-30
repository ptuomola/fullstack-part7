import React from 'react'
import { connect } from 'react-redux'
import BlogRow from './BlogRow'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {
  const blogs = props.blogs
  const newNoteRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel="create new" ref={newNoteRef}>
        <CreateBlog newNoteRef={newNoteRef}/>
      </Togglable>
      <p/>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}><td><BlogRow blog={blog} /></td></tr>)}
        </tbody>
      </Table>
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
