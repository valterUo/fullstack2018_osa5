import React from 'react'

const CreateNewBlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
    return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
      <div>Title: 
        <input
              name="title"
              value={title}
              onChange={handleChange}
            /></div>
      <div>Author: 
        <input
              name="author"
              value={author}
              onChange={handleChange}
            /></div>
      <div>url: 
        <input
              name="url"
              value={url}
              onChange={handleChange}
            />
      </div>
      <button type="submit">Create</button>
      </form>
    </div>
    )
}

  export default CreateNewBlogForm