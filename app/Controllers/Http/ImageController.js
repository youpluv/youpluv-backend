'use strict'
const Helpers = use('Helpers')
const Image = use('App/Models/Image')
const Env = use('Env')
const appUrl = Env.get("APP_URL_FOR_FILES" , "https://youpluv.herokuapp.com")
const appStatic = Env.get("APP_STATIC")


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
class ImageController {

  async store({ request, response }) {
    let imagePersist = new Image()
    let randomNAme = Math.floor(Math.random() * 1000)
    const image = request.file('image', {
      types: ['image'],
      size: '10mb'
    })
    const { type } = request.body
    let newName = `${type}_${randomNAme}_image`
    newName = `${newName}_${image.fieldName}.${image.extname}`

    await image.move(Helpers.publicPath('files'), {
      name: newName,
      overwrite: true
    })

    if (!image.moved()) {
      return image.error()
    } else {
      imagePersist.url = `${appUrl}${appStatic}${newName}`
      imagePersist.size = image.size
      imagePersist.type = type

     await  imagePersist.save()
    }
    return imagePersist
  }
}

module.exports = ImageController
