'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RainfallSchema extends Schema {
  up () {
    this.create('rainfalls', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('latitude')
      table.string('longitude')
      table.string('rain_data')
      table.datetime('initial_date')
      table.datetime('final_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('rainfalls')
  }
}

module.exports = RainfallSchema
