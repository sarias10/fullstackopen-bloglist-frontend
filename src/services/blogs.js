import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

// const main = async () =>{
//     const response = await getAll()
//     console.log('token',token)
//     console.log('Blogs', response)
// }
// main()

export default { getAll, setToken }