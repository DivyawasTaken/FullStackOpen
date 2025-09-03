import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, removeBlog }) => {
    const [likes, setLikes] = useState(blog.likes)
    const [isDeleted, setIsDeleted] = useState(false)
  const [vis, setvis] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('show')
  const blogStyle = {
    paddingTop: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 2
  }

  const showvis = { display: vis ? '' : 'none' }
  const isSameUser = (blog.user.id === user.id) || (blog.user === user.id)

  const clickShow = () => {
    setButtonLabel(vis ? 'show' : 'hide')
    setvis(!vis)
  }

  const updateLikes = async() => {
    const blogUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }
    addLike(blogUpdate, blog.id)
    setLikes(likes+1)
  }
  const deleteBlog = async() => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      setIsDeleted(true)
      try {
        removeBlog(blog.id)
      } catch {
        setIsDeleted(false)
      }
    }
  }
  if (!isDeleted) {
    return (
    <div style={blogStyle} data-testid="blog card">
      <div className="blog_header">
        {blog.title} {blog.author}
        <button onClick={clickShow}>
          {buttonLabel}
        </button>
      </div>
      <div style={showvis} className="blog_show">
        <div>
          {blog.url}
        </div>
        <div>
          {likes}
          <button 
            onClick={updateLikes}
            placeholder='Button add like'
            >
            like
          </button>
        </div>
        <div>
          {blog.user !== null && user.name}
        </div>
        {isSameUser  && <button onClick={deleteBlog}>Delete</button>}
      </div>
    </div>
    )
  }
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object, 
  addLike: PropTypes.func,
  removeBlog: PropTypes.func
}

export default Blog