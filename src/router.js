const controller = require('./scoreControl.js');

// Attach routes
const router = (app) => {
  app.get('/', controller.getPage);

  // For our score api
  app.route('/gamers')
  .get(controller.getAllGamers)
  .post(controller.createAGamer);

// Export the router
module.exports = router;
