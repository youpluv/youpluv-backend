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
Route.post("/login", "AuthController.login");
Route.post("/social-login", "AuthController.socialLogin");
//Testando rotas acl...
Route.get("/acl" , () => {
  console.log('Eu sou usuario admin')
  return "sou admin"
} ).middleware(['auth:jwt', 'is:administrador'])
