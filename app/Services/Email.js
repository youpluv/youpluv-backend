"use strict";
const Mail = use('Mail')


class EmailService {
  async Send(subject, to, view, emailData) {
    console.log('Chegou no service' , subject, to, view, emailData);

    const ret = await Mail.send(`emails.${view}`, emailData, (message) => {
      message
        .to(to)
        .subject(subject)
    })
    return 'Envio de E-mail registrado!'
  }
}
module.exports = new EmailService();
