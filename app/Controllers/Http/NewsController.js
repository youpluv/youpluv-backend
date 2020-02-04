'use strict'
const News = use("App/Models/News");
const Push = use("App/Services/Push")
const User = use("App/Models/User")


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with news
 */
class NewsController {

  async index({ request, response, view }) {
    console.log('index news!')
    return await News.all()
  }
  async store({ request, response }) {

    const { image, title, subtitle, description, date, source } = request.body
    let news = new News()
    let tokens = []
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

    await Push.send('news' , news)
    return news
  }


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

  async destroy({ params, request, response }) {
    const { id } = request.params
    let news = {}
    news = await News.find(id)
    if (!news || news == null || news == "") {
      console.log("vazio")
      return response.status(404).json({ message: "error" })
    } else {
      await news.delete()
    }
    return response.status(202).json({ message: "deleted" })

  }
}

module.exports = NewsController
