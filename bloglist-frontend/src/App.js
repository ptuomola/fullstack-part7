import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import { useField, filterAttr } from './hooks'
import { showError, showSuccess } from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      username.reset()
      password.reset()
      setUser(user)
      props.showSuccess('login successful', 5)
    } catch (exception) {
      username.reset()
      password.reset()
      props.showError('wrong username or password', 5)
    }
  }

  const newNoteRef = React.createRef()

  const handleCreate = async (title, author, url) => {
    try
    {
      const newBlog = await blogService.create({
        title, author, url,
      })

      newBlog.user = user

      newNoteRef.current.toggleVisibility()

      setBlogs(blogs.concat(newBlog))
      props.showSuccess(`a new blog ${title} by ${author} added`, 5)
    } catch (exception) {
      props.showError('create failed', 5)
    }
  }

  const handleLogout = async(event) =>
  {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    props.showSuccess('logged out', 5)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...filterAttr(username)} />
        </div>
        <div>
          password
          <input {...filterAttr(password)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleLike = async(blog, event) => {
    event.stopPropagation()
    blog.likes++
    await blogService.update(blog)
    setBlogs(blogs.map(i => i.id === blog.id ? blog : i))
  }

  const handleRemove = async(blog, event) => {
    event.stopPropagation()

    if(!window.confirm('remove blog ' + blog.title + ' by ' + blog.author))
      return

    try {
      await blogService.remove(blog)
      setBlogs(blogs.filter(i => i.id !== blog.id))
      props.showSuccess(`blog ${blog.title} by ${blog.author} removed`, 5)
    } catch (exception) {
      props.showError('remove failed', 5)
    }
  }

  return (
    <div>
      <Notification/>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{ user.name } logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new note" ref={newNoteRef}>
            <CreateBlog handleCreate={handleCreate}/>
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
          )}
        </div>
      }
    </div>
  )
}

export default connect(null, { showSuccess, showError })(App)