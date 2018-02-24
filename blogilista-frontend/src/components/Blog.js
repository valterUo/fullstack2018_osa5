import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({blog, user}) => {

  const handleLikeChange = async (event) => {
    try {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    await blogService.update(blog._id, newBlog)
    window.location.reload()
  } catch (exception) {
    console.log(exception)
  }
  }

  const handleDeleteChange = async (event) => {
    const result = window.confirm('Do you want to remove the blog?')
    if(result) {
    try {
      await blogService.remove(blog._id)
      window.location.reload()
    } catch (exception) {
      console.log(exception)
    }
  }
  }

if(blog.user) {
  if(blog.user.username === user.username) {
return(
  <div> 
    <p>{blog.url}</p>
    {blog.likes} likes <button onClick= {handleLikeChange}>like</button> 
    <p> added by {blog.user.name}</p>
    <button onClick= {handleDeleteChange}>Delete</button>
  </div>
)
  } else {
    return(
      <div> 
        <p>{blog.url}</p>
        {blog.likes} likes <button onClick= {handleLikeChange}>like</button> 
        <p> added by {blog.user.name}</p>
      </div>
    )
  }
} else {
  return(
    <div> 
      <p>{blog.url}</p>
      {blog.likes} likes <button onClick= {handleLikeChange}>like</button> 
      <p> added by anonymous</p>
      <button onClick= {handleDeleteChange}>Delete</button>
    </div>
  )}
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog