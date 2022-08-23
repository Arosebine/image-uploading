const rateLimit = require('express-rate-limit');

// rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 5,
});

module.exports = limiter;
