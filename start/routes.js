"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/users", "UserController.all").middleware("auth");

Route.get("/weather", "WeatherController.getWeather");

Route.post("/register", "AuthController.register");
Route.post("/register-admin", "AuthController.registerAdmin");

Route.post("/login", "AuthController.login");
Route.post("/social-login", "AuthController.socialLogin");

Route.get("/acl" , ({request , result }) => {
  console.log('Eu sou usuario admin')
  return "ok"
} ).middleware(['auth:jwt', 'is:administrator'])


Route.put("/change-role" , "AuthController.changeRole").middleware(['auth:jwt', 'is:administrator'])
