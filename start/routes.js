'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route');
const Profile = use('App/Models/Profile')

/*
|--------------------------------------------------------------------------
| Normal Part
|--------------------------------------------------------------------------
*/

Route.get('/', 'DefaultController.home').as('home')
Route.on('help').render('welcome').as('help')
Route.on('about').render('welcome').as('about')

/*
|--------------------------------------------------------------------------
| Sessions Route
|--------------------------------------------------------------------------
|
| [Method]  [Route]             [Action]
| POST      /sessions           SessionController.store     建立一個會話
| GET       /sessions/login     SessionController.create    建立一個會話（頁面）
| DELETE    /sessions           SessionController.destroy   創建一篇文章（頁面）
| 
*/

Route.group(() => {
  Route.post('/', 'SessionController.store').as('sessions.store').middleware(['guest'])
  Route.get('/login', 'SessionController.create').as('sessions.create').middleware(['guest'])
  Route.delete('/', 'SessionController.destroy').as('sessions.destroy').middleware(['auth'])
})
  .prefix('sessions')

/*
|--------------------------------------------------------------------------
| Users Route
|--------------------------------------------------------------------------
|
| [Method]  [Route]             [Action]
| POST      /users              UserController.store        註冊一名用戶
| GET       /users/new          UserController.create       註冊一名用戶（頁面）
| 
*/

Route.group(() => {
  Route.get('/', 'UserController.create').as('users.create').middleware(['guest'])
  Route.post('/', 'UserController.store').as('users.store').validator('UserRegister').middleware(['guest'])
})
  .prefix('users')

/*
|--------------------------------------------------------------------------
| Posts Route
|--------------------------------------------------------------------------
| 
| [Method]  [Route]             [Action]
| GET       /posts              PostController.index        列出所有文章
| POST      /posts              PostController.store        創建一篇文章
| GET       /posts/new          PostController.create       創建一篇文章（頁面）
| GET       /posts/:id          PostController.show         獲取某篇文章
| PUT       /posts/:id          PostController.update       更新某篇文章（全部）
| PATCH     /posts/:id          PostController.update       更新某篇文章（部分）
| DELETE    /posts/:id          PostController.destroy      刪除某篇文章
| GET       /posts/:id/edit     PostController.edit         編輯某篇頁面
| 
*/

Route.group(() => {
  Route.get('/', 'PostController.index').as('posts.index')
  Route.post('/', 'PostController.store').as('posts.store').middleware(['auth'])
  Route.get('/new', 'PostController.create').as('posts.create').middleware(['auth'])
  Route.get('/:id', 'PostController.show').as('posts.show')
  Route.put('/:id', 'PostController.update').as('posts.update').middleware(['own:post'])
  Route.patch('/:id', 'PostController.update').as('posts.update').middleware(['own:post'])
  Route.delete('/:id', 'PostController.destroy').as('posts.destroy').middleware(['own:post'])
  Route.get('/:id/edit', 'PostController.edit').as('posts.edit').middleware(['own:post'])
})
  .prefix('posts')

/*
|--------------------------------------------------------------------------
| All User Part
|--------------------------------------------------------------------------
| - :user
| - :user/followers
| - :user/following
| 
*/

// Route.get(':user', async ({ params }) => {
// 	const profile = await Profile.find(params.user)
// 	const user = await profile.user().select('username').fetch()

// 	return {
// 		profile,
// 		user
// 	}
// })

// Route.get(':user/followers', async ({ params }) => {
// 	const profile = await Profile.find(params.username)
// 	const user = await profile.user().select('username').fetch()

// 	return {
// 		profile,
// 		user
// 	}
// })

// Route.get(':user/following', async ({ params }) => {
// 	const profile = await Profile.find(params.username)
// 	const user = await profile.user().select('username').fetch()

// 	return {
// 		profile,
// 		user
// 	}
// })

/*
|--------------------------------------------------------------------------
| Wildcard Route
|--------------------------------------------------------------------------
*/

Route.any('*', ({ response }) => response.route('home'))