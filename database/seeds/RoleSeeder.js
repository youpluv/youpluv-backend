'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')

class RoleSeeder {
  async run() {

    const roleAdmin = new Role()

    roleAdmin.name = 'Administrator'
    roleAdmin.slug = 'administrator'
    roleAdmin.description = 'manage administration privileges'
    await roleAdmin.save()

    const roleMobile = new Role()
    roleMobile.name = 'Mobile'
    roleMobile.slug = 'mobile'
    roleMobile.description = 'app mobile user'
    await roleMobile.save()
  }
}

module.exports = RoleSeeder
