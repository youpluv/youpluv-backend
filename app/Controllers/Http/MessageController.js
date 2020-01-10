"use strict";
const Mail = use('Mail')
const EmailService = use('App/Services/Email')

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
}

module.exports = MessageControler;
