import { useState } from 'react'

const Blog = ({ username, blog, updateBlog, deleteBlog }) => {

  const blogStyle = {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    border: 'thin solid #A9A9A9',
  }

  const btnStyle = {
    marginLeft: 5,
  }

  const [showDetail, setShowDetail] = useState(false)
  const [userLikes, setUserLikes] = useState(blog.likes)

  const addLike = () => {
    setUserLikes(userLikes + 1)
    const blogToUpdate = { ...blog, likes: userLikes + 1 }
    updateBlog(blogToUpdate)
  }

  return (
    <div className="blog" style={blogStyle}>

      Title: {blog.title} / By: {blog.author}

      <button id="viewBtn" style={btnStyle} onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'Hide Details' : 'View Details'}
      </button>

      {showDetail && (
        <div>
          <a className='url'
            href={blog.url.includes('//')
              ? blog.url
              : `//${blog.url}`
            }
          >
            {blog.url}
          </a>

          <div id='likes'>
            likes {blog.likes}{' '}
            <button id='likesBtn' style={btnStyle} onClick={addLike}>
              Like
            </button>
          </div>

          <div>
            created by {blog.user.username} on {blog.date}
          </div>

          {blog.user.username === username &&
            <button style={btnStyle} onClick={() => deleteBlog(blog)}>
              Remove Blog
            </button>
          }
        </div>
      )}

    </div>
  )
}

export default Blog