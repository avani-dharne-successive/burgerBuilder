import axios from 'axios'


const instance = axios.create({
    baseURL : 'https://react-burger-ee61a.firebaseio.com/'
})


export default instance