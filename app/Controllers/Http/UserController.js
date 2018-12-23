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

// Resourceful controller for interacting with users

const Database = use('Database')
const User = use('App/Models/User')
const Post = use('App/Models/Post')
const Event = use('Event')

/*
|--------------------------------------------------------------------------
| UserController
|--------------------------------------------------------------------------
|
| Connect to database and do CRUD opertion to deal with User signup,
| delete and post problem
|
| - create  : Render a form to be used for creating a new user.
| - store   : Create a new user in database
| - destroy : Delete a user in database
|
*/

class UserController {

/*
|--------------------------------------------------------------------------
| POST      /users              UserController.store        註冊一名用戶
|--------------------------------------------------------------------------
*/

  async store ({ auth, session, request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    Event.emit('user.store', data)

    // Authenticate the user
    await auth.login(user)

    return response.redirect('/')
  }

/*
|--------------------------------------------------------------------------
| GET       /users/new          UserController.create       註冊一名用戶（頁面）
|--------------------------------------------------------------------------
*/

  async create ({ view }) {
    return view.render('users.create')
  }

}

module.exports = UserController