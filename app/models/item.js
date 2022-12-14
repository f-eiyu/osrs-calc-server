// imports
const mongoose = require("mongoose");

// schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  last_updated: {
    type: String,
    required: true
  },
  incomplete: {
    type: Boolean,
    required: true
  },
  members: {
    type: Boolean,
    required: true
  },
  placeholder: {
    type: Boolean,
    required: true
  },
  equipment: {
    attack_stab: {
      type: Number,
      required: true,
      default: 0
    },
    attack_slash: {
      type: Number,
      required: true,
      default: 0
    },
    attack_crush: {
      type: Number,
      required: true,
      default: 0
    },
    attack_magic: {
      type: Number,
      required: true,
      default: 0
    },
    attack_ranged: {
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
    melee_strength: {
      type: Number,
      required: true,
      default: 0
    },
    ranged_strength: {
      type: Number,
      required: true,
      default: 0
    },
    magic_damage: {
      type: Number,
      required: true,
      default: 0
    },
    prayer: {
      type: Number,
      required: true,
      default: 0
    },
    slot: {
      type: String,
      required: true,
      index: true
    }
  },
  weapon: {
    attack_speed: {
      type: Number
    },
    weapon_type: {
      type: String
    },
    stances: [{
      combat_style: {
        type: String
      },
      attack_type: {
        type: String
      },
      attack_style: {
        type: String
      },
      experience: {
        type: String
      }
    }]
  },

  // for consistency, we'll use runescape's own numerical identifiers in lieu
  // of mongoose's hashes
  _id: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Item", itemSchema);