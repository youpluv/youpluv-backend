const { Expo } = require('expo-server-sdk')
const User = use("App/Models/User")

let expo = new Expo();

class Push {

  async send(type, data) {

    const message = await this.createMessage(type, data)
    const tokens = await this.getTokens()
    let pushes = [];
    for (let pushToken of tokens) {

      pushes.push({
        to: pushToken,
        sound: 'default',
        body: message.body,
        data: message.data,
      })
      console.log(pushes)
    }
    let chunks = expo.chunkPushNotifications(pushes);
    let tickets = [];
    await this.sendPushes(chunks)
    return true
  }

  async sendPushes(chunks) {
    let tickets = [];
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  }
  async getTokens() {
    let tokens = [];
    const users = await User.all()
    for (const userIt in users.rows) {
      let user = users.rows[userIt]
      console.log('token -> ', user.email, user.device_token_id)
      if (user.device_token_id !== "" && user.device_token_id !== null && user.device_token_id !== 'undefined') {
        if (Expo.isExpoPushToken(user.device_token_id)) {
          tokens.push(user.device_token_id)
        } else {
          console.log(`Push token ${user.device_token_id} is not a valid Expo push token`);
        }
      }
    }
    return tokens
  }

  async createMessage(type, data) {
    let pushContent = {}
    console.log('data : ' , data)
    if (type == 'news') {
      pushContent = { body: data.title, data: { type: type, id: data.id } }
    }

    if (type = 'message'){
      pushContent = { body: data.title, data: { type: type, id: data.id } }
    }
    console.log('push content -> ' , pushContent)
    return pushContent

  }
};
module.exports = new Push()
