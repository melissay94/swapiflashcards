const controller = require('./scoreControl.js');

// Attach routes
const router = (app) => {
  app.get('/', controller.getPage);
};

// Export the router
module.exports = router;
