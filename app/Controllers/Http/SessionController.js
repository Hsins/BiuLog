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

const Event = use('Event')
//const Activity = use('App/Models/Activity')

/*
|--------------------------------------------------------------------------
| SessionController
|--------------------------------------------------------------------------
*/

class SessionController {

  /*
  |--------------------------------------------------------------------------
  | POST      /sessions           SessionController.store     建立一個會話
  |--------------------------------------------------------------------------
  */

  async store ({ request, response, auth, session }) {
    console.log("Sessions Store")
    const { username, password } = request.all()
    console.log(request.all())
    await auth.attempt(username, password)

    const user = await auth.getUser()

    Event.emit('user.login', user)

    const redirectUrl = session.get('redirectUrl')

    if (redirectUrl) {
      session.forget('redirectUrl')
      return response.redirect(redirectUrl)
    }

    return response.route('/')
  }

  /*
  |--------------------------------------------------------------------------
  | GET       /sessions/login     SessionController.create    建立一個會話（頁面）
  |--------------------------------------------------------------------------
  */

	async create ({ view, auth, response, request, session }) {
	  console.log("Sessions Create")
    const { redirect } = request.get()

    if (redirect) {
      session.put('redirectUrl', redirect)
    }

    try {
      await auth.check()
    } catch (error) {
      return view.render('sessions.create')
    }

    return response.redirect('back')
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE    /sessions           SessionController.destroy   創建一篇文章（頁面）
  |--------------------------------------------------------------------------
  */

  async destroy ({ auth, response }) {
    //const activityUser = await Activity.findBy('username', auth.user.username)

    //if (activityUser) {
    //  Event.emit('activity.leaveRoom', auth.user)
    //  await Activity.query().where('username', auth.user.username).delete()
    //}
    
    await auth.logout()
    
    return response.route('/')
  }
}

module.exports = SessionController