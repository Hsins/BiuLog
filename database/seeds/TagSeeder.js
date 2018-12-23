'use strict'

/*
|--------------------------------------------------------------------------
| TagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Tag = use('App/Models/Tag')

class TagSeeder {
  async run () {
    const tags = [
      { tagName: '工作' },
      { tagName: '日常' },
      { tagName: '攝影' },
      { tagName: '編程' },
      { tagName: '讀書' },
    ]
    await Tag.createMany(tags)
  }
}

module.exports = TagSeeder
