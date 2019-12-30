import blogService from '../services/blogs'
import { showError, showSuccess } from './notificationReducer'

export const like = (blog) => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(changedBlog)
    updatedBlog.user = changedBlog.user

    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const comment = (blog, comment) => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      comments: [comment, ...blog.comments]
    }

    await blogService.addComment(changedBlog, comment)

    dispatch({
      type: 'COMMENT',
      data: changedBlog
    })
  }
}


export const remove = (blog) => {
  return async dispatch => {
    try
    {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog,
      })
      dispatch(showSuccess(`blog ${blog.title} by ${blog.author} removed`, 5))
    } catch (exception) {
      dispatch(showError('remove failed', 5))
    }
  }
}


export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      newBlog.user = blog.user

      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(showSuccess(`a new blog ${blog.title} by ${blog.author} added`, 5))
    } catch (exception) {
      dispatch(showError('create failed', 5))
    }
  }
}

export const getBlogForId = (state, blogId) => {
  return state.blogs.find(val => val.id === blogId)
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type)
  {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'REMOVE_BLOG':
    return state.filter(i => i.id !== action.data.id)
  default:
    return state
  }
}

export default reducer
