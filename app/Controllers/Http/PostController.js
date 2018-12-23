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

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')
const Route = use('Route')
// const MarkdownIt = require('markdown-it'),
// 	md = new MarkdownIt()
// const md5 = require('js-md5')

class PostController {

  /*
  |--------------------------------------------------------------------------
  | GET       /posts              PostController.index        列出所有文章
  |--------------------------------------------------------------------------
  */
  
	async index ({ request, auth, view, response }) {
	  let _posts = ''
	  let posts

		_posts = await Post.query()
			.orderBy('created_at', 'desc')
			.with('user')
		// 	, (builder) => {
		// 		builder.select('id', 'username')
		// 	})
			.with('user.profile').fetch()

		posts = _posts.toJSON()
	 
    // const posts = await Post.all()
    return view.render('default.explore', { posts })
	}

  /*
  |--------------------------------------------------------------------------
  | POST      /posts              PostController.store        創建一篇文章
  |--------------------------------------------------------------------------
  */

	async store ({ request, response, session, auth }) {
		const newPost = request.only([ 'title', 'content' ])
		const { content } = newPost
		newPost.reads = 0
		newPost.likes = 0
		// const postId = await Database.insert(newPost).into('posts')
		// console.log(postId)
		// const post = await Post.create(newPost)

		// const user = await User.find(request.input('user_id'))

		const post = await auth.user.posts().create(newPost)

		return response.route('posts.show', { id: post.id })
	}

  /*
  |--------------------------------------------------------------------------
  | GET       /posts/new          PostController.create       創建一篇文章（頁面）
  |--------------------------------------------------------------------------
  */

	async create ({ request, response, view, auth }) {
		const userId = auth.user.toJSON().id
		const userItems = [
			{
				...auth.user.toJSON(),
				check: true
			}
		]

		return view.render('posts.create', {
			users: userItems,
			userId,
		})
	}

  /*
  |--------------------------------------------------------------------------
  | GET       /posts/:id          PostController.show         獲取某篇文章
  |--------------------------------------------------------------------------
  */

	async show ({ params, auth, response, view }) {
		// const post = await Database.from('posts')
		//   .where('id', params.id)
		//   .first()

		await Post.query().where('id', params.id).increment('reads', 1)

		let userId = ''
    let post = ''
    let _post = await Post.findOrFail(params.id)
    const user = await _post.user().fetch()
		if (auth.user) {
			userId = auth.user.toJSON().id
			const _user = await User.find(auth.user.id)
      post = _post.toJSON()
		} else {
      post = _post.toJSON()
    }

		return view.render('posts.show', {
			post,
			userId,
			user: user.toJSON()
		})
	}

}

module.exports = PostController
