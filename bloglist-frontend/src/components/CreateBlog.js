import React from 'react'
import { useField, filterAttr } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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

  // newBlog.user = user


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitNewBlog}>
        <div>
          title:
          <input {...filterAttr(title)} />
        </div>
        <div>
          author:
          <input {...filterAttr(author)} />
        </div>
        <div>
          url:
          <input {...filterAttr(url)} />
        </div>

        <button type="submit">create</button>
      </form>
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