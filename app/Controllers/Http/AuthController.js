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
  async registerAdmin({ request, auth }) {
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


  async changeRole({ request, response }) {
    const { user: userId, role: roleId } = request.body
    let user = {}
    let role = {}
    try {
      user = await User.find(userId)
      if (!user) {
        return response.status(404).json({ error: "User not found" })
      }

    } catch (e) {
      return response.status(500).json({ error: "error when getting user..." })
    }

    try {
      role = await Role.find(roleId)
      if (!role) {
        return response.status(404).json({ error: "Role not found" })
      }

    } catch (e) {
      return response.status(500).json({ error: "error when getting Role..." })
    }

    const rolesToRemove = await user.getRoles();
    await user.roles().detach();
    await user.roles().attach([role.id]);

    return response.status(200).json({user:user , role: await user.getRoles()})


  }
}


module.exports = AuthController;
