// imports
const mongoose = require("mongoose");

// schema
const loadoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  loadout: {
    weapon: {
      type: String,
      required: true,
      default: "None"
    },
    neck: {
      type: String,
      required: true,
      default: "None"
    },
    ring: {
      type: String,
      required: true,
      default: "None"
    },
    feet: {
      type: String,
      required: true,
      default: "None"
    },
    legs: {
      type: String,
      required: true,
      default: "None"
    },
    cape: {
      type: String,
      required: true,
      default: "None"
    },
    hands: {
      type: String,
      required: true,
      default: "None"
    },
    head: {
      type: String,
      required: true,
      default: "None"
    },
    body: {
      type: String,
      required: true,
      default: "None"
    },
    shield: {
      type: String,
      required: true,
      default: "None"
    },
    ammo: {
      type: String,
      required: true,
      default: "None"
    },
    style: {
      type: String,
      required: true,
      default: "crush"
    },
    styleType: {
      type: String,
      required: true,
      default: "accurate"
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Loadout", loadoutSchema);