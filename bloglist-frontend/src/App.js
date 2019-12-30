import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.initializeUsers()
  // eslint-disable-next-line
  }, [])


  const handleLogout = async(event) =>
  {
    event.preventDefault()
    props.logoutUser()
  }

  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          { props.user !== null ? <> { props.user.name } logged in <button onClick={handleLogout}>logout</button> </> : '' }
        </div>
        <h2>blog app</h2>
        <Notification/>
        { props.user === null ?
          <LoginForm />
          :
          <div>
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route path="/users/:id" render={({ match }) => <User userId={match.params.id} /> }/>
            <Route path="/blogs/:id" render={({ match }) => <Blog blogId={match.params.id} /> }/>
          </div>
        }
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUsers, setUser, logoutUser })(App)