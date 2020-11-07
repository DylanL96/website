// LIVE dictates if we are in development or production. If false, it is in development
const LIVE = false;

if (LIVE) {
  module.exports = require('./prod.js')
} else {
  module.exports = require('./dev.js');
}

