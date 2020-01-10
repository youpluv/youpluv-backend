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
  async index({ request, response, view }) {
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
  async store({ request, response }) {

    const { image, title, subtitle, description, date, source } = request.body
    let news = new News()
    try {


      news.title = title
      news.subtitle = subtitle
      news.description = description
      news.date = date
      news.source = source
      news.image = image

      await news.save()
    } catch (e) {
      return response.status(400).json({ error: e })
    }

    return news
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
  async show({ params, request, response, view }) {

    const { id } = request.params
    let news = {}
    try {
      news = await News.find(id)
      if (!news) {
        return response.status(404).json({ error: "news not found" })
      }

    } catch (e) {
      return response.status(400).json({ error: e })
    }
    return news

  }

  /**
   * Update news details.
   * PUT or PATCH news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { image, title, subtitle, description, date, source } = request.body
    const { id } = request.params
    let news = {}
    try {
      news = await News.find(id)
      if (!news) {
        return response.status(404).json({ error: "news not found" })
      }
      news.title = title
      news.subtitle = subtitle
      news.description = description
      news.date = date
      news.source = source
      news.image = image

      await news.save()
    } catch (e) {
      return response.status(400).json({ error: e })
    }
    return news

  }

  /**
   * Delete a news with id.
   * DELETE news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = request.params
    let news = {}
    try {
      news = await News.find(id)
      await news.delete()

    } catch (e) {
      return response.status(400).json({ error: e })
    }
    return response.status(204)

  }
}

module.exports = NewsController
