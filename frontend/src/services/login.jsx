import axios from "axios";
import baseUrl from '../components/constants'

const login = async credential => {
    console.log("services>login: credential ", credential)
    const res = await axios.post(baseUrl.login, credential)
    console.log("services>login: res ", res)
    return res.data
}

export default { login }