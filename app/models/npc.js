// imports
const mongoose = require("mongoose");

// schema
const npcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_updated: {
    type: String,
    required: true,
    default: ""
  },
  incomplete: {
    type: Boolean,
    required: true
  },
  members: {
    type: Boolean,
    required: true
  },
  combat_level: {
    type: Number,
    required: true,
    default: 0
  },
  size: {
    type: Number,
    required: true,
    default: 0
  },
  hitpoints: {
    type: Number,
    required: true,
    default: 0
  },
  attack_type: [{
    type: String
  }],
  attack_speed: {
    type: Number,
    required: true,
    default: 0
  },
  poisonous: {
    type: Boolean,
    required: true
  },
  venomous: {
    type: Boolean,
    required: true
  },
  immune_poison: {
    type: Boolean,
    required: true
  },
  immune_venom: {
    type: Boolean,
    required: true
  },
  attributes: [{
    type: String
  }],
  category: [{
    type: String
  }],
  slayer_monster: {
    type: Boolean,
    required: true
  },
  duplicate: {
    type: Boolean,
    required: true
  },
  attack_level: {
    type: Number,
    required: true,
    default: 0
  },
  strength_level: {
    type: Number,
    required: true,
    default: 0
  },
  defence_level: {
    type: Number,
    required: true,
    default: 0
  },
  magic_level: {
    type: Number,
    required: true,
    default: 0
  },
  ranged_level: {
    type: Number,
    required: true,
    default: 0
  },
  attack_bonus: {
    type: Number,
    required: true,
    default: 0
  },
  strength_bonus: {
    type: Number,
    required: true,
    default: 0
  },
  attack_magic: {
    type: Number,
    required: true,
    default: 0
  },
  magic_bonus: {
    type: Number,
    required: true,
    default: 0
  },
  attack_ranged: {
    type: Number,
    required: true,
    default: 0
  },
  ranged_bonus: {
    type: Number,
    required: true,
    default: 0
  },
  defence_stab: {
    type: Number,
    required: true,
    default: 0
  },
  defence_slash: {
    type: Number,
    required: true,
    default: 0
  },
  defence_crush: {
    type: Number,
    required: true,
    default: 0
  },
  defence_magic: {
    type: Number,
    required: true,
    default: 0
  },
  defence_ranged: {
    type: Number,
    required: true,
    default: 0
  },

  // for consistency, we'll use runescape's own numerical identifiers in lieu
  // of mongoose's hashes
  _id: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Npc", npcSchema);