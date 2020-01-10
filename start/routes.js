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

Route.get('/news' , "NewsController.index").middleware("auth");
Route.get('/news/:id' , "NewsController.show").middleware("auth");
Route.get('/news/find/:query' , "NewsController.index").middleware("auth");

Route.post('/news' , "NewsController.store").middleware(['auth:jwt', 'is:administrator']);
Route.put('/news/:id' , "NewsController.update").middleware(['auth:jwt', 'is:administrator']);
Route.delete('/news/:id' , "NewsController.destroy").middleware(['auth:jwt', 'is:administrator']);

Route.get('/rainfall' , "RainfallController.index").middleware("auth");
Route.get('/rainfall/:id' , "RainfallController.show").middleware("auth");
Route.post('/rainfall' , "RainfallController.store").middleware("auth");
Route.put('/rainfall/:id' , "RainfallController.update").middleware("auth");
Route.delete('/rainfall/:id' , "RainfallController.destroy").middleware("auth");//middleware(['auth:jwt', 'is:administrator']);

Route.post('/images' , "ImageController.store").middleware(['auth:jwt', 'is:administrator']);

Route.get("/users", "UserController.all").middleware(['auth:jwt', 'is:administrator']);

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
Route.post("/send-email", "MessageController.SendEmail").middleware("auth");
