import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { showError, showSuccess } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  const handleLogout = async(event) =>
  {
    event.preventDefault()
    props.logoutUser()
  }

  const newNoteRef = React.createRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      { props.user === null ?
        <LoginForm />
        :
        <div>
          <p>{ props.user.name } logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new note" ref={newNoteRef}>
            <CreateBlog newNoteRef={newNoteRef}/>
          </Togglable>
          {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={props.user}/>
          )}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { showSuccess, showError, initializeBlogs, setUser, logoutUser })(App)