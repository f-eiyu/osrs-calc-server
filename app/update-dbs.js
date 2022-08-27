// imports
const Npc = require("./models/npc");
const Item = require("./models/item");
const parsedData = require("./data/parse-all");

const mongoose = require("mongoose");
const db = require("../config/db");


// connect to Mongoose
mongoose.connect(db, {
	useNewUrlParser: true,
})

// seed item and npc databases
const seed = async () => {
  console.log("Purging and refreshing database...");

  // first, purge the item and npc databases
  await Npc.deleteMany();
  await Item.deleteMany();

  // then, fill the dbs with fresh data
  const { npcsParsed, itemsParsed } = parsedData;
  
  await Npc.create(npcsParsed);
  await Item.create(itemsParsed);

  console.log("Database refreshed!");
}

seed().then(() => mongoose.connection.close());