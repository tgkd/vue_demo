import axios from 'axios'
import api from './config'

class User {
  constructor () {
    this.user = api.methods.user
    this.api = axios.create({
      baseURL: api.backendUrl,
      timeout: 15000,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async login (user) {
    return await this.api.request({
      method: this.user.login.method,
      url: this.user.login.url,
      data: { user }
    })
  }
}

export default User
