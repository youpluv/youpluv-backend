"use strict";

const User = use("App/Models/User");
const Role = use("Role");

class AuthController {
  async register({ request, auth }) {
    const roleMobile = await Role.find(2);

    const data = request.only(["email", "password", "username"]);
    const { email, password } = data;

    const user = await User.create(data);
    await user.roles().attach([roleMobile.id]);

    const jwt = await auth.attempt(email, password);

    user.token = jwt.token;

    return user;
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    const jwt = await auth.attempt(email, password);
    const user = await User.query()
      .where("email", email)
      .first();
    user.token = jwt.token;
    return user;
  }

  async socialLogin({ request, auth }) {
    const data = request.only(["email", "password", "username", "picture"]);
    const { email, password } = data;
    try {
      const jwt = await auth.attempt(email, password);
      const user = await User.query()
        .where("email", email)
        .first();
      user.token = jwt.token;
      return user;
    } catch (error) {
      const user = await User.create(data);
      const jwt = await auth.attempt(email, password);
      user.token = jwt.token;
      return user;
    }
  }
  //Admin user register only
  async adminRegister({ request, auth }) {
    const roleMobile = await Role.find(1);

    const data = request.only(["email", "password", "username"]);

    const { email, password } = data;
    const roleAdmin = await Role.find(1);
    const user = await User.create(data);

    await user.roles().attach([roleAdmin.id]);

    const jwt = await auth.attempt(email, password);

    user.token = jwt.token;

    return user;
  }
}

module.exports = AuthController;
