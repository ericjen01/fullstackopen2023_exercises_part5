import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageObj, setMessageObj] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getBlogs().then(blogs => setBlogs(blogs))
    }

  }, [])

  const handleMessage = (message, type) => {
    setMessageObj({ message, type })
    setTimeout(() => { setMessageObj() }, 2000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("loggin in with ", username, "*password*")
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedinBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      handleMessage('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedinBlogUser')
    setUser(null)
    handleMessage(`User logged out.`, 'success');
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.createBlog(blogObject);
      setBlogs(blogs.concat(newBlog))
    } catch (ex) {
      handleMessage('New blog creation failed', 'error')
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
        updateUsername={({ target }) => setUsername(target.value)}
        updatePassword={({ target }) => setPassword(target.value)} />}

      {user && <>
        <h2>
          {user.username} logged in
          <button onClick={handleLogout}>Logout</button>
        </h2>

        {blogs.map(b => <Blog key={b.id} blog={b} />)}

      </>}

      <BlogForm createBlog={createBlog} />
    </>
  )
}

export default App
