"use strict";

const User = use("App/Models/User");
const Role = use("Role");
const EmailService = use('App/Services/Email')


class AuthController {
  async register({ request, auth }) {
    const roleMobile = await Role.find(2);

    const data = request.only(["email", "password", "username" , "device_token"]);
    const { email, password , device_token: device_token_id } = data;

    const user = await User.create({ email, password , device_token_id });
    await user.roles().attach([roleMobile.id]);

    const jwt = await auth.attempt(email, password);

    user.token = jwt.token;

    return user;
  }

  async login({ request, auth }) {
    console.log('Chegou aqui na req!!')
    const { email, password  } = request.body;
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


  async forgotPassword({ request, auth,response }) {
    const { email } = request.body
      let user = await User.findBy('email', email)
      if (!user) {
        response.status(404).json({ error: "Not found" })
      } else {
        const newPassword = Math.floor(Math.random() * 1000 + 1000)
        user.password = newPassword.toString()
        await user.save()
        console.log('password',user.password)
        const status = await EmailService.Send("Recuperação de senha", email, "password", {password:newPassword , email})
        return status
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

    return response.status(200).json({ user: user, role: await user.getRoles() })


  }
}


module.exports = AuthController;
