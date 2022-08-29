// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// const Item = require('../models/item')
const hiscores = require("osrs-json-hiscores");

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX -- retrieve all items on app load
router.get("/player/:name", async (req, res, next) => {
  let player;

  try {
    player = await hiscores.getStats(req.params.name);
  } catch (error) {
    res.status(200).json({failed: true});
    return;
  }
  
  const playerStats = player.main.skills;
  playerStats.name = player.name;
  delete playerStats.overall;
  res.status(200).json(playerStats);
});

module.exports = router;