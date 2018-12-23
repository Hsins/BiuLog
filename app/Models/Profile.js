'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
  // Database Relationship
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Profile
