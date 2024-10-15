import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] =useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  //create new Blog
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

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
        console.log('token',blogService.token);
        setUser(response)
        window.localStorage.setItem('user', JSON.stringify(response))
    }catch (error){
        console.error(error.message)
    }
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    try{
        const response = await blogService.createBlog({
          title: title,
          author: author,
          url: url
        })
        const newBlogs = blogs.concat(response.data);
        setBlogs(newBlogs)
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
      {user ?
      <>
        {userLogged()}
        <button onClick={logOut}>
          log out
        </button>
        {createNewBlog()}
        <h2>blogs</h2>
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