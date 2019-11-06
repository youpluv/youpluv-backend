'use strict'

const User = use("App/Models/User")

class AuthController {
  async register({request, auth}) {
    const data = request.only(["email", "password", "username"])
    const {email, password} = data

    const user = await User.create(data)
    const jwt = await auth.attempt(email, password)

    user.token = jwt.token

    return user
  }

  async login({request, auth}) {
    const {email, password} = request.all()
    const token = auth.attempt(email, password)

    return token
  }
}

module.exports = AuthController
