'use strict'
const News = use("App/Models/News");


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with news
 */
class NewsController {
  /**
   * Show a list of all news.
   * GET news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await News.all()
  }



  /**
   * Create/save a new news.
   * POST news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log('ok')

  }

  /**
   * Display a single news.
   * GET news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    console.log('ok')

  }

  /**
   * Update news details.
   * PUT or PATCH news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    console.log('ok')

  }

  /**
   * Delete a news with id.
   * DELETE news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    console.log('ok')
  }
}

module.exports = NewsController
