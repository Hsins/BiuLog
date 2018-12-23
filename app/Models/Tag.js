'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  post() {
    return this.belongsToMany('App/Models/Post')
  }
}

module.exports = Tag
