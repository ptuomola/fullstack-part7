import React from 'react'
import { connect } from 'react-redux'
import { getBlogForId } from '../reducers/blogReducer.js'
import { like, remove, comment } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import { useField, filterAttr } from '../hooks'
import { Form, Button, Table } from 'react-bootstrap'

const Blog = withRouter((props) => {
  const newComment = useField('text')
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

  const handleComment = (blog) =>
  {
    props.comment(blog, newComment.value)
    newComment.reset()
  }

  return (
    <div>
      <Table striped>
        <thead>
          <tr><th className="lead">Title</th><th className="lead" colSpan="2">{blog.title}</th></tr>
        </thead>
        <tbody>
          <tr><td>URL</td><td colSpan="2"><a href={blog.url}>{blog.url}</a></td></tr>
          <tr><td>Likes</td><td>{blog.likes}</td><td><Button variant="primary" onClick={(event) => handleLike(blog, event)}>like</Button></td></tr>
          <tr><td>Added by</td><td>{blog.user.name}</td><td>{ user.username === blog.user.username ?
            <Button variant="danger" onClick={(event) => handleRemove(blog, event)}>remove</Button>
            : '' }
          </td></tr>
        </tbody>
      </Table>
      <p/>
      <h4>comments</h4>
      <Form inline='true' onSubmit={() => handleComment(blog)}>
        <Form.Group>
          <Form.Control type="input" {...filterAttr(newComment)}/>
          <Button variant="primary" type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <p></p>
      <Table striped>
        <tbody>
          { blog.comments.map(comment => <tr key={comment}><td>{comment}</td></tr>) }
        </tbody>
      </Table>
    </div>
  )
})

const mapStateToProps = (state, props) => {
  return {
    blog: getBlogForId(state, props.blogId),
    user: state.user
  }
}

export default connect(mapStateToProps, { like, remove, comment })(Blog)
