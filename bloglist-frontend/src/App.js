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
import { Nav, Navbar, Jumbotron } from 'react-bootstrap'


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
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" as="ul">
              <Nav.Link style={padding} href="#" as="li">
                <Link to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link style={padding} href="#" as="li">
                <Link to="/users">users</Link>
              </Nav.Link>
              {props.user !== null ?
                <>
                  <Nav.Link style={padding} href="#" as="li" disabled>
                    {props.user.name} logged in
                  </Nav.Link>
                  <Nav.Link style={padding} href="#" as="li">
                    <Link to="#" onClick={handleLogout}>logout</Link>
                  </Nav.Link>
                </>
                : ''
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron>
          <h1>blog app</h1>
        </Jumbotron>
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