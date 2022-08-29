// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for items
const Item = require('../models/item')

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
router.get("/items", (req, res, next) => {
  const itemNone = {
    "None": {
      "equipment": {
        attack_crush: 0,
        attack_magic: 0,
        attack_ranged: 0,
        attack_slash: 0,
        attack_stab: 0,
        defence_crush: 0,
        defence_magic: 0,
        defence_ranged: 0,
        defence_slash: 0,
        defence_stab: 0,
        magic_damage: 0,
        melee_strength: 0,
        prayer: 0,
        ranged_strength: 0,
        slot: "ammo",
      },
      incomplete: false,
      last_updated: "",
      members: false,
      name: "None",
      placeholder: false,
      weapon: { stances: [] },
      _id: -1
    }
  };

  const unarmedWeapon = {
    attack_speed: 4,
    weapon_type: "crush_unarmed",
    stances: [
      {
        combat_style: "punch",
        attack_type: "crush",
        attack_style: "accurate",
        experience: "attack"
      },
      {
        combat_style: "kick",
        attack_type: "crush",
        attack_style: "aggressive",
        experience: "strength"
      },
      {
        combat_style: "block",
        attack_type: "crush",
        attack_style: "defensive",
        experience: "defence"
      }
    ]
  };

  Item.find().sort({"name": 1})
    .then(items => {
      // categorize the items by slot
      const itemsBySlot = {};

      for (const item of items) {
        const slot = item.equipment.slot;
        if (itemsBySlot[slot]) { itemsBySlot[slot][item.name] = item; }
        else { itemsBySlot[slot] = { ...itemNone, [item.name]: item}; }
      }

      // there's no practical difference between a "weapon" and a "2h" for the
      // purposes of the calculator, and indeed, it doesn't make sense to have
      // a separate "2h" slot, so these categories can be merged into just the
      // "weapon" category
      itemsBySlot["weapon"] = {
        ...itemsBySlot["weapon"],
        ...itemsBySlot["2h"]
      };
      delete itemsBySlot["2h"];

      // special case -- unarmed attacks also have attack styles
      itemsBySlot.weapon.None.weapon = unarmedWeapon;

      // return the categorized items
      return itemsBySlot;
    })
    .then(items => { // send the categorized items to the client
      res.status(200).json(items);
    })
    .catch(next);
});

module.exports = router;