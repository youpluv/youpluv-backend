'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsSchema extends Schema {
  up () {
    this.create('news', (table) => {
      table.increments()
      table.string("title", 100).notNullable();
      table.string("subtitle", 180).notNullable();
      table.string("description", 1000).notNullable();
      table.string("source", 200).notNullable();
      table.string("image", 250).notNullable();
      table.date("date");
      table.timestamps()

    })
    //image, title, subtitle, description, date, source
  }

  down () {
    this.drop('news')
  }
}

module.exports = NewsSchema
