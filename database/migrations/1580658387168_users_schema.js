'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      // alter table
      table.string('device_token_id')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('device_token_id')
    })
  }
}

module.exports = UsersSchema
