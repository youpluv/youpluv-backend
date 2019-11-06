'use strict'

const Database = use('Database')

class UserController {
  async all() {
    return await Database.select('*').from('users')
  }
}

module.exports = UserController
