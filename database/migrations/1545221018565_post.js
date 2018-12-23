'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title')
      table.text('content', 'longText')
      table.text('md_content', 'longText')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('reads').unsigned().notNullable().defaultTo(0)
      table.integer('likes').unsigned().notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
