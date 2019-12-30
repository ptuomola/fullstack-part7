var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, val) => sum + val.likes, 0)

const favouriteBlog = (blogs) => blogs.reduce((max, val) => (val.likes >= max.likes) ? val : max)

const mostBlogs = (blogs) => {
  return _.transform(_.countBy(blogs, (val) => val.author), (result, value, key) => 
  {
    if(value > result.blogs)
    {
      result.author = key
      result.blogs = value
    }
  }, { author: '',  blogs: 0 })
}

const mostLikes = (blogs) => {
  var authorLikes = blogs.reduce(((result, curblog) => {
    result[curblog.author] = (result[curblog.author]) ? result[curblog.author] + curblog.likes : curblog.likes
    return result
  }), {})

  return _.transform(authorLikes, (result, value, key) => 
  {
    if(value > result.likes)
    {
      result.author = key
      result.likes = value
    }
  }, { author: '',  likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs, 
  mostLikes
}