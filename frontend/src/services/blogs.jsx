import axios from 'axios'
import baseUrl from '../components/constants'

let token;
const config = () => ({
    headers: {
        Authorization: token,
    },
});

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
    console.log("*** f services token: ", token)
}

const getBlogs = () => {
    const res = axios.get(baseUrl.blogs)
    return res.then(response => response.data)
}

const createBlog = async (newObj) => {
    console.log("*** f services blogs newobj: ", newObj)
    console.log("*** f services blogs config: ", config)
    const res = await axios.post(baseUrl.blogs, newObj, config())
    console.log("****** F services blogs res: ", res)
    return res.data
}

export default { setToken, getBlogs, createBlog }