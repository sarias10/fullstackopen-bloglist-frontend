import { useState } from "react"
import blogService from "../services/blogs"
import blogs from "../services/blogs"
import { compareFn } from "../utils"

const Blog = ({ blog, name, blogs,setBlogs }) => {
  const [showDetails, setShowDetails] =useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //cambia el estado showDetails para mostrar los demas atributos de blog
  const controlShowDetails = () => {
    setShowDetails(!showDetails)
  }

  //maneja el boton de like
  const handleLikes = async () => {
    console.log(blog.id);
    const likes = blog.likes + 1
    console.log(likes);
    const updateBlog = {
      likes: blog.likes + 1
    }
    const response = await blogService.updateBlog(blog.id, updateBlog)
    //obtiene la lista de blogs como prop en el componente y actualiza los likes solo del blog con el mismo id
    const allBlogs = blogs.map(item => {
      if(item.id === blog.id){
        item.likes = response.data.likes
      }
      return item
    })
    setBlogs(allBlogs)
  }

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={controlShowDetails}>view</button>
    {showDetails && 
    <div>
    {blog.id}
    <br/>
    {blog.url}
    <br/>
    likes {blog.likes} <button onClick={handleLikes}>like</button>
    <br/>
    {name}
    </div>
    }
  </div>  
)}

export default Blog