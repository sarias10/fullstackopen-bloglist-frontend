import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}



//token de kelly, solo para ejemplos
const config2 = {
  headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtlbGx5IiwiaWQiOiI2NmZlODJhYzRmNmM2YWQzZjhjZjhjYTIiLCJpYXQiOjE3Mjg5NDg2MDd9.EM3HM2lsP9I0ZOv4XidnrcjoRhXjg9D8LGlCF6TSz7g'}
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

// const main = async () =>{
//   console.log('ejecutandose');
//     const response = await createBlog({
//       title: "blog de prueba kelly",
//       author: "otro de prueba kelly",
//       url: "otro.com"
//   })
//   console.log('Blogs', response)
// }
// main()

export default { getAll, setToken, createBlog, token }