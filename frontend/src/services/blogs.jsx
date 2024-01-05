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
    const res = await axios.post(baseUrl.blogs, newObj, config())
    return res.data
}

const deleteBlog = async (id) => {
    await axios.delete(`${baseUrl.blogs}/${id}`, config());
};

export default { setToken, getBlogs, createBlog, deleteBlog }