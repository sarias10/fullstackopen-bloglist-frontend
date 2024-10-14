import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] =useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
        const response = await loginService.login(username, password)
        blogService.setToken(response.token)
        setUser(response)
        
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
        <button type="submit">login</button>
    </form>
  )

  const userLogged = () => (
    <div>
      {user.name} log-in
    </div>
  )

  return (
    <div>
      {user ?
      <>
        {userLogged()}
        <h2>blogs</h2>
        {user && 
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