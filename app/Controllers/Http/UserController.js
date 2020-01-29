'use strict'

const User = use("App/Models/User")
class UserController {
  async all() {

    let userInstance = await User.all()

    const promise = userInstance.forEach(async element => {
      element.role = await element.getRoles()
      console.log(element)
    });
    Promise.all(promise);

return users  }
}

module.exports = UserController
