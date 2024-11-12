import { useState } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'
import { compareFn } from '../utils'

const Blog = ({ blog, name, blogs, setBlogs, updateBlog }) => {
  const [showDetails, setShowDetails] =useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeButtonStyle = {
    backgroundColor:'red',
    color: 'white',
    fontWeight: 'bold'
  }
  //cambia el estado showDetails para mostrar los demas atributos de blog
  const controlShowDetails = () => {
    setShowDetails(!showDetails)
  }

  //maneja el boton de like
  const handleLikes = async () => {
    const newBlog = {
      likes: blog.likes + 1
    }
    const response = await updateBlog(blog.id, newBlog)
    //obtiene la lista de blogs como prop en el componente y actualiza los likes solo del blog con el mismo id
    const allBlogs = blogs.map(item => {
      if(item.id === blog.id){
        item.likes = response.data.likes
      }
      return item
    })
    setBlogs(allBlogs)
  }
  //maneja el boton de remove
  const handleDelete = async () => {
    if(confirm('Do you want to delete the blog?')){
      const response = await blogService.deleteBlog(blog.id)
      const allBlogs = blogs.filter(item => item.id !== blog.id)
      setBlogs(allBlogs)
    }
  }

  return(
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={controlShowDetails}>view</button>
      {showDetails &&
      <div>
        <span>{blog.id}</span>
        <br/>
        <span>{blog.url}</span>
        <br/>
        <span>likes {blog.likes}</span> <button onClick={handleLikes}>like</button>
        <br/>
        <span>{name}</span>
        <br/>
        <button style={removeButtonStyle} onClick={handleDelete}>remove</button>
      </div>
      }
    </div>
  )}

export default Blog