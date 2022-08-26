// imports
const Npc = require("./models/npc");
const Item = require("./models/item");
const parsedData = require("./data/parse-all");


// seed item and npc databases
const seed = async () => {
  console.log("Purging and refreshing database...");

  // first, purge the item and npc databases
  await Npc.deleteMany();
  await Item.deleteMany();

  // then, fill the dbs with fresh data
  const { npcsParsed, itemsParsed } = parsedData;
  
  await Npc.create(npcsParsed);
  for (const slotName of Object.keys(itemsParsed)) {
    const slotItems = itemsParsed[slotName];
    await Item.create(slotItems);
  }

  console.log("Database refreshed!");
}

module.exports = seed;