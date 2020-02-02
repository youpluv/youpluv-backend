import { Expo } from 'expo-server-sdk';

// Create a new Expo SDK client
let expo = new Expo();

class Push {

  async send(message, tokens) {
    /**
     * message = {message.body , message.data}
     * array of tokens...
     */
    // Create the pushes that you want to send to clents
    let pushes = [];
    for (let pushToken of tokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
      pushes.push({
        to: pushToken,
        sound: 'default',
        body: message.body,
        data: message.data,
      })
    }
    let chunks = expo.chunkPushNotifications(pushes);
    let tickets = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
        }
      }
    })()
  }
};
module.exports = new Push()
