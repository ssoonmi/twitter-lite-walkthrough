const express = require('express');
const router = express.Router();

const csrfProtection = require("csurf")({ cookie: true });

router.get('/login', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/signup', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect("/home");
    return;
  }
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/home', csrfProtection, (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("home", { username: req.user.username, csrf: req.csrfToken() });
});

router.get('/tweets/:id', (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("tweet-show", { username: req.user.username })
});

router.get('*', (req, res) => {
  res.render('error-page');
});

module.exports = router;