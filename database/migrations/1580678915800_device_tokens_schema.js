'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceTokensSchema extends Schema {
  up () {
    this.create('device_tokens', (table) => {
      table.increments()
      table.string('device_token')
      table.string('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('device_tokens')
  }
}

module.exports = DeviceTokensSchema
