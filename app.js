const express = require("express");
const app = express(); // initializing an express app

const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');

app.set("view engine", "pug");

const logger = require('morgan');

app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setTimeout(1000);
  req.setTimeout(1000);

  next();
});

const { getUserFromToken } = require("./routes/utils/auth");

app.use(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next();

  const user = await getUserFromToken(token);
  if (user) req.user = user;
  next();
});

app.use('/public', express.static('public'));
app.use('/api', apiRouter);
app.use('/', pagesRouter);


module.exports = app;