import auth from './auth'
class Api {
  constructor() {
    this.root = '/api/'
  }

  async ajax(options) {
    let url = this.root + options.url

    const o = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: options.method,
    }

    if (!options.auth) {
      o.headers.Authorization = await auth.getToken()
    }

    if (options.data) {
      o.body = JSON.stringify(options.data)
    }

    let response
    try {
      response = await fetch(url, o)
    } catch (e) {
      throw 'No internet'
    }

    if (!options.auth && response.status == 401) {
      auth.login()
      throw null
    }

    if (response.status == 204) return
    else if (response.status == 200) {
      try {
        const json = await response.json()
        return json
      } catch {
        throw 'BadJSON'
      }
    } else {
      throw response.status
    }
  }

  async get(options) {
    if (typeof options == 'string') options = { url: options }
    return await this.ajax({ ...options, method: 'GET' })
  }

  async post(options) {
    return await this.ajax({ ...options, method: 'POST' })
  }
}

const api = new Api()
export default api

const get = api.get.bind(api)
const post = api.post.bind(api)

export { get, post }
