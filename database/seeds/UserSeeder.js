'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const user = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = [
      {username: 'admin'  , email: 'hsinspeng@gmail.com', password: 'admin'},
      {username: 'net5566', email: 'net5566@abc.com'    , password: 'maize'},
      {username: 'tutorzz', email: 'abcde@sl.com'       , password: 'medal'}
    ]

    await user.createMany(users);
  }
}

module.exports = UserSeeder;