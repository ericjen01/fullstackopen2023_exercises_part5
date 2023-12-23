import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getBlogs().then(blogs => setBlogs(blogs))
  }, [])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("loggin in with ", username, "*password*")
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.createBlog(blogObject);
      setBlogs(blogs.concat(newBlog))
    } catch (ex) {
      setErrorMessage('New blog creation failed')
    }
  }

  return (
    <>
      <h2>Blogs</h2>
      {!user && <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        updateUsername={({ target }) => setUsername(target.value)}
        updatePassword={({ target }) => setPassword(target.value)} />}

      {user && <>
        <h2>{user.username} logged in</h2>
        {blogs.map(b => (
          <Blog key={b.id} blog={b} />
        ))}
      </>}

      <BlogForm createBlog={createBlog} />
    </>
  )
}

export default App
