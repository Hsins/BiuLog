'use strict'

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Profile = use('App/Models/Profile')

class ProfileSeeder {
  async run () {
    const profiles = [{
        userNick: '張無忌',
        age: 35,
        description: '出生起在冰火島過著原始生活，踏足中土後即幼失怙恃，中寒毒命危，帶病習醫，義送孤兒至西域。忍受寒毒煎熬七年，福緣際會，身兼「九陽神功」、「太極拳、劍」、「聖火令神功」、「乾坤大挪移」、「七傷拳」、「少林龍爪手」等蓋世武功，在書中幾無敵於天下。',
        user_id: 1,
      },
      {
        userNick: '韋小寶',
        age: 29,
        description: '自幼在揚州妓院長大，雖然目不識丁、武藝低微，但機智重義。自從在皇宮冒充太監開始，周旋於多方勢力之間，屢遇奇險，總能憑其手腕脈絡，化險為夷，結交上不少清初歷史與傳說人物，辦成多番大事。',
        user_id: 2,
      },
    ]
    await Profile.createMany(profiles);
  }
}

module.exports = ProfileSeeder;