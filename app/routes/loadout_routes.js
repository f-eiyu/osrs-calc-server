const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')

// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const Loadout = require('../models/loadout')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// index
router.get("/get-loadouts", requireToken, (req, res, next) => {
  const userId = req.user.id;
  
  Loadout.find({owner: userId})
    .then(loadouts => loadouts.map(loadout => loadout.toObject()))
    .then(loadouts => {
      const loadoutRes = {};
      loadouts.forEach(loadout => loadoutRes[loadout.name] = loadout.loadout);
      return loadoutRes;
    })
    .then(loadouts => res.status(200).json({ loadouts }))
    .catch(next);
});

// create and update, merged into one for this specific use case
router.post("/add-loadout", requireToken, async (req, res, next) => {
	const userId = req.user.id;
	const { loadoutName, loadout } = req.body.loadoutEntry;

	await Loadout.findOneAndUpdate({
    name: loadoutName,
    owner: userId
  }, {
    loadout
  }, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  });

  const newLoadouts = {};
  (await Loadout.find({owner: userId})).forEach(loadout => {
    newLoadouts[loadout.name] = loadout.loadout;
  });

	res.status(201).json({ newLoadouts });
});

// delete
router.delete("/delete-loadout/:name", requireToken, (req, res, next) => {
  const userId = req.user.id;
  const loadoutName = req.params.name;

  Loadout.deleteOne({owner: userId, name: loadoutName})
    .then(console.log)
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;