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

Route.get('api/news', "NewsController.index").middleware("auth");
Route.get('api/news/:id', "NewsController.show").middleware("auth");
Route.get('api/news/find/:query', "NewsController.index").middleware("auth");

Route.post('api/news', "NewsController.store").middleware(['auth:jwt', 'is:administrator']);
Route.put('api/news/:id', "NewsController.update").middleware(['auth:jwt', 'is:administrator']);
Route.delete('api/news/:id', "NewsController.destroy").middleware(['auth:jwt', 'is:administrator']);

Route.get('api/rainfall', "RainfallController.index").middleware("auth");
Route.get('api/rainfall/:id', "RainfallController.show").middleware("auth");
Route.post('api/rainfall', "RainfallController.store").middleware("auth");
Route.put('api/rainfall/:id', "RainfallController.update").middleware("auth");
Route.delete('api/rainfall/:id', "RainfallController.destroy").middleware("auth");//middleware(['auth:jwt', 'is:administrator']);

Route.post('api/images', "ImageController.store").middleware(['auth:jwt', 'is:administrator']);
Route.get('api/images', "ImageController.index").middleware(['auth:jwt', 'is:administrator']);

Route.get("api/users", "UserController.all").middleware('auth');

Route.get("api/weather", "WeatherController.getWeather");

Route.post("api/forgot-password", "AuthController.forgotPassword");
Route.post("api/register", "AuthController.register");
Route.post("api/register-admin", "AuthController.registerAdmin");

Route.post("api/login", "AuthController.login");
Route.post("api/social-login", "AuthController.socialLogin");

Route.put("api/change-role", "AuthController.changeRole").middleware(['auth:jwt', 'is:administrator'])
Route.post("api/send-email", "MessageController.SendEmail").middleware("auth");
Route.post("api/send-push", "MessageController.SendPush").middleware("auth");

Route.get("/", ({request,response}) => { response.json({message:"Youpluv API v1.0"}) })
Route.get("api/", ({request,response}) => { response.json({message:"Youpluv API v1.0"}) })

Route.get("/acl", ({ request, result }) => {
  console.log("Eu sou usuario admin");
  return "ok";
}).middleware(["auth:jwt", "is:administrator"]);

// Route.put("/change-role" , "AuthController.changeRole").middleware(['auth:jwt', 'is:administrator'])
Route.put("api/change-role", "AuthController.changeRole").middleware(["auth:jwt"]);
Route.post("api/send-email", "MessageController.SendEmail").middleware("auth");
