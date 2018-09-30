const app = require('express')();
const cors = require('cors');

app.use(cors())

app.get('/', [
  require('./middleware/duration'),
  require('./middleware/auth'),
], require('./routes/index/get'));

module.exports = app