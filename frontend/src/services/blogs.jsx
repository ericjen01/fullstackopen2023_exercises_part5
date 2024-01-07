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

const get = () => {
    const res = axios.get(baseUrl.blogs)
    return res.then(response => response.data)
}

const create = async (newObj) => {
    const res = await axios.post(baseUrl.blogs, newObj, config())
    return res.data
}

const update = async (id, newObj) => {
    const res = await axios.put(`${baseUrl.blogs}/${id}`, newObj, config())
    return res.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl.blogs}/${id}`, config());
};

export default { setToken, get, create, update, remove }