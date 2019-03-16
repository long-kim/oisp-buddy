const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/get', (req, res) => {
  res.send({express: "Hello From Server"})
});

app.post('/api/post', (req, res) => {
  console.log(req.body);
  res.send(`I received your message. Is this what you sent?\n${req.body.post}`,);
});

app.listen(4000, () =>
  console.log('Express server is running on localhost:4000')
);