import React from 'react'
import { useField, filterAttr } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const CreateBlog = (props) =>
{
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submitNewBlog = async (event) => {
    event.preventDefault()
    props.createBlog({ title: title.value, author: author.value, url: url.value, user: props.user })
    title.reset()
    author.reset()
    url.reset()
    props.newNoteRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={submitNewBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type="input" {...filterAttr(title)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control type="input" {...filterAttr(author)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control type="input" {...filterAttr(url)} />
        </Form.Group>
        <Button variant="primary" type="submit">create</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,
  { createBlog, showError, showSuccess })(CreateBlog)