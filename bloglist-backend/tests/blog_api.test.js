const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('check blogs have an id attribute', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('posting a new blog adds it to the database', async () => {
  const newBlog = {
    title: 'My blog post',
    author: 'me myself and i',
    likes: 123123
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('My blog post')
})

test('posting a new blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Blog with no likes',
    author: 'me myself and i'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const blog = blogsAtEnd.filter((blog) => blog.title === 'Blog with no likes')
  expect(blog[0].likes).toBe(0)
})

test('posting a new blog without title and url', async () => {
  const newBlog = {
    author: 'me myself and i'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  await api
    .delete('/api/blogs/' + blogsAtStart[0].id)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
})

test('updating likes', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const updatedBlog = 
  {
    'id': blogsAtStart[0].id,
    'likes': blogsAtStart[0].likes + 1
  }

  await api
    .put('/api/blogs/' + updatedBlog.id)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  
  expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes + 1)
})


afterAll(() => {
  mongoose.connection.close()
})