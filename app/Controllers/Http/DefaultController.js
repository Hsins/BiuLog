'use strict'

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
|
| Controllers are attached to one or many routes and are the common
| point of interaction between your models, views and any other services
| you may need.
|
| A complete guide on controllers is available here.
| https://adonisjs.com/docs/4.1/controllers
|
*/

const Post = use('App/Models/Post')

/*
|--------------------------------------------------------------------------
| DefaultController
|--------------------------------------------------------------------------
*/

class DefaultController {
  async home ({ view, auth, response }) {
    console.log(response)
    try {
      await auth.check()
      const posts = await Post.all()
      
      return response.route('posts.index')
    } catch (e) {}
    
    return view.render('default.landing')
  }
}

module.exports = DefaultController