import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [messageObj, setMessageObj] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinBlogUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)
      blogService
        .get()
        .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    }

  }, [])

  const handleMessage = (message, type) => {
    setMessageObj({ message, type })
    setTimeout(() => { setMessageObj() }, 2000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('loggin in with ', username, '*password*')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedinBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      const blogList = blogs.sort((a, b) => b.likes - a.likes)

      setBlogs(blogList)
      setUser(user)
      setusername('')
      setPassword('')
      handleMessage('login successful.', 'success')
    }
    catch (ex) {
      handleMessage('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedinBlogUser')
    setUser(null)
    handleMessage('User logged out.', 'success')
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
    } catch (ex) {
      handleMessage('New blog creation failed', 'error')
    }
  }

  const updateBlog = async (blog) => {
    console.log('blog: ', blog)
    try {
      await blogService.update(blog.id, blog)
      const blogs = await blogService.get()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      handleMessage(`blog '${blog.title}' by '${blog.author}' liked`, 'success')
    } catch (err) {
      handleMessage(`liking failed: ${err}`, 'error')
    }

  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`reomve ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        const result = await blogService.getBlogs()
        setBlogs(result)
        handleMessage(`removing '${blog.title}' by '${blog.author}' suceeded`, 'success')
      }
    } catch (err) {
      handleMessage(`removing '${blog.title}' by '${blog.author}' failed`, 'error')
    }
  }

  return (
    <>

      <Notification messageObj={messageObj} />

      <h2>Blogs</h2>

      {!user && <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        updateUsername={({ target }) => setusername(target.value)}
        updatePassword={({ target }) => setPassword(target.value)} />}

      {user && <>

        <h2>
          {user.username} logged in
          <button onClick={handleLogout}>Logout</button>
        </h2>

        <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>

        {blogs.map(blog =>
          <Blog
            key={blog.id}
            {...{ username: user.username, blog, updateBlog, deleteBlog, }}
          />
        )}

      </>}
      <Footer/>
    </>
  )
}

export default App
