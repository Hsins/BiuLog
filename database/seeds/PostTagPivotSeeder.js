'use strict'

/*
|--------------------------------------------------------------------------
| PostTagPivotSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class PostTagPivotSeeder {
  async run () {
    await Database.table('post_tag').insert([
      {post_id: 1, tag_id: 1},
      {post_id: 1, tag_id: 4},
      {post_id: 3, tag_id: 2},
      {post_id: 2, tag_id: 3},
    ])
  }
}

module.exports = PostTagPivotSeeder
