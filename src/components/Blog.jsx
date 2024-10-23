import { useState } from "react"

const Blog = ({ blog, name }) => {
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

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={controlShowDetails}>view</button>
    {showDetails && 
    <div>
    {blog.url}
    <br/>
    likes {blog.likes} <button>like</button>
    <br/>
    {name}
    </div>
    }
  </div>  
)}

export default Blog