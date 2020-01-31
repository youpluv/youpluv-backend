'use strict'

const User = use("App/Models/User")
class UserController {
  async all({ request, response, auth }) {
    response.header('content-range', 'user 1-10/200')
    let users = await User.all()

    return users
  }
}

module.exports = UserController
