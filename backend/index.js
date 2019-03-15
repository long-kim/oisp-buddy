const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/', (req, res) => {
  	res.send("Hello World.")
});

app.listen(4000, () =>
  console.log('Express server is running on localhost:4000')
);