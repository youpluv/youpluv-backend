"use strict";

const User = use("App/Models/User");
const Mail = use("Mail");

class AuthController {
  async register({ request, auth }) {
    const data = request.only(["email", "password", "username"]);
    const { email, password } = data;

    const user = await User.create(data);
    const jwt = await auth.attempt(email, password);

    user.token = jwt.token;

    return user;
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    const user = await User.query()
      .where("email", email)
      .first();
    user.token = token;
    // try {
    //   console.log(`chegou!`)
    //   await Mail.send("emails.welcome", user.toJSON(), message => {
    //     message
    //       .to(user.email)
    //       .from("alan.techsafe@gmail.com", "YouPluv")
    //       .subject("Welcome to yardstick");
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    return user;
  }

  async socialLogin({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    const user = await User.query()
      .where("email", email)
      .first();
    user.token = token;
    // try {
    //   console.log(`chegou!`)
    //   await Mail.send("emails.welcome", user.toJSON(), message => {
    //     message
    //       .to(user.email)
    //       .from("alan.techsafe@gmail.com", "YouPluv")
    //       .subject("Welcome to yardstick");
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    return user;
  }
}

module.exports = AuthController;
