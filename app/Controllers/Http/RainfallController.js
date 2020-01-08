'use strict'
const Rainfall = use("App/Models/Rainfall");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rainfalls
 */
class RainfallController {
  /**
   * Show a list of all rainfalls.
   * GET rainfalls
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await Rainfall.all()
  }

  /**
   * Render a form to be used for creating a new rainfall.
   * GET rainfalls/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store ({ request, response, auth }) {

    const {initial_date, final_Date, latitude, longitude, rain_data} = request.body;
    try {
      let rainfall = new Rainfall()

      rainfall.user_id = auth.user.id
      rainfall.initial_date = initial_date;
      rainfall.final_Date = final_Date;
      rainfall.latitude = latitude;
      rainfall.longitude = longitude;
      rainfall.rain_data = rain_data;

      await rainfall.save();
      return rainfall
    }catch(e){
      return response.json({error:`Error on save : ${e}`})
    }

  }
  /**
   * Display a single rainfall.
   * GET rainfalls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update rainfall details.
   * PUT or PATCH rainfalls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a rainfall with id.
   * DELETE rainfalls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RainfallController
