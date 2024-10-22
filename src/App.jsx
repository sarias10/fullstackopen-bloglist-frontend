import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] =useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  //create new Blog
  const [title, setTitle] = useState('')//si dejo esto null da error, creo que porque al enviar datos, se envian nulos
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visibilityNewBlog, setVisibilityNewBlog] =useState(null)
  //message
  const [message, setMessage] = useState(
    {message: 'Mensaje de prueba...',
    error: false
  })
  //refs
  const blogFormRef = useRef()//se utiliza para crear una referencia blogFormRef, que se asigna al componente togglable para poder usar las funciones definidas y (permitidas) dentro del componente padre 

  useEffect(() => {
    //si el user existe entonces se obtienen todos los blogs
    const fetchBlogs = async () =>{
      if(user){
        const response = await blogService.getAll()
        setBlogs(response)
      }
    }
    fetchBlogs()
    
  }, [user])//actualiza el estado blogs cuando el user cambia
  
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('user'))
    if(data){
      setUser(data)
      blogService.setToken(data.token) //establece otra vez el token
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
        const response = await loginService.login(username, password)
        blogService.setToken(response.token)
        setUser(response)
        window.localStorage.setItem('user', JSON.stringify(response))
        setMessage({message: 'welcome', error: false})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }catch (error){
      setMessage({message: error.response.data.error, error: true})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    try{
        blogFormRef.current.toggleVisibility()
        const response = await blogService.createBlog({
          title: title,
          author: author,
          url: url
        })
        const newBlogs = blogs.concat(response.data);
        setBlogs(newBlogs)
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage({message: `a new blog ${response.data.title} by ${response.data.author} added`, error: false})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }catch (error){
        console.error(error.message)
    }
  }


  const login = () => (
    <form onSubmit={handleLogin}>
        <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">create</button>
    </form>
  )

  const createNewBlog = () => (
    <form onSubmit={handleCreateNewBlog}>
        <div>
            title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            url
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
    </form>
  )

  const showCreateBlogForm = () => (
    <Togglable buttonLabel={'newNote'} ref={blogFormRef}>{/*se pasa blogFormRef como referencia*/}
      {createNewBlog()}
    </Togglable>
  )

  const userLogged = () => (
    <div>
      {user.name} log-in
    </div>
  )

  const logOut = () => {
    setUsername(null)
    setPassword(null)
    setBlogs(null)
    setUser(null)
    blogService.setToken(null)    
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <h2>blogs</h2>
      {message &&
      <Message message={message.message} error ={message.error}/>}
      {user ?
      <>
        {userLogged()}
        <button onClick={logOut}>
          log out
        </button>
        <h2>create new</h2>
        {showCreateBlogForm()}
        <h2>blogs list created by {user.name}</h2>
        {blogs && 
        (blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ))
        }
      </>
      :
      <>
      <h2>log in to application</h2>
      {login()}
      </>  
      }
      
    </div>
  )
}

export default App