const Error = require("../repository/error");
const Event = require("../repository/event");

class MongoLogger {
  async storeError(err) {
    try {
      let error = new Error({
        date: new Date(),
        text: err.message,
        code: err.status,
        route: err.route,
      });

      await error.save();
    } catch (err) {
      console.log(err);
    }
  }

  async storeEvent(req, res, next) {
    try {
      let event = new Event({
        date: new Date(),
        route: req.originalUrl ? req.originalUrl : "unknown",
        userId: req.userId ? req.userId : 0,
        method: req.method,
        body: req.body || null,
        params: req.params || null,
        query: req.query || null,
      });

      await event.save();

      next();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new MongoLogger();
