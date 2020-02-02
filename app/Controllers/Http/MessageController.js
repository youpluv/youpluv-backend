"use strict";
const Mail = use('Mail')
const EmailService = use('App/Services/Email')
const Push = use('App/Services/Push')
class MessageControler {
  async SendEmail({ request, auth, response }) {
    const { subject, to, view, emailData } = request.body

    let status = ""
    console.log('Controller')
    try {
      status = await EmailService.Send(subject, to, view, emailData)
    } catch (e) {
      return response.status(400).json({ error: e })
    }
    return status
  }

  async SendPush({request,response,auth}){
    const data = request.only(['title' , 'id' , 'type'])
    await Push.send(data.type , {...data})
    return response.status(202).json({message:'no-content'})
  }
}

module.exports = MessageControler;
