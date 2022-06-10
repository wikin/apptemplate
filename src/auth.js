class Auth {
  constructor() {
    this.account
    this.token
  }

  /**
   * Obtain account information from redirect response or from session storage
   */
  async init() {
    // read account and token from session storage
    // if token expired refresh it
  }

  async login() {
    //just for demo purposes. in real life need to be replaced with redirect to login page

    this.account = '1234'
    await this.getTokenSilent()
    return this.token
  }

  async logout() {
    //just for demo purposes. in real life need to also redirect to logout page

    this.account = undefined
    this.token = undefined
  }

  /**
   * get last token from memory or if not stored, call api to get new one
   * @returns {string}
   */
  async getToken() {
    if (this.token !== undefined) return this.token

    if (this.account !== undefined) {
      await this.getTokenSilent()
      return this.token
    } else {
      return await this.login()
    }
  }

  async getTokenSilent() {
    this.token = 'Bearer AAAA'
  }
}

export default new Auth()
