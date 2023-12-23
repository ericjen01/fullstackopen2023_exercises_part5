import axios from 'axios'
import baseUrl from '../components/constants'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getBlogs = () => {
    const res = axios.get(baseUrl.blogs)
    return res.then(response => response.data)
}

const createBlog = async (newObj) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.post(baseUrl.blogs, newObj, config)
    return res.data
}

export default { setToken, getBlogs, createBlog }