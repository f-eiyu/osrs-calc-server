// imports
const Npc = require("./models/npc");
const Item = require("./models/item");
const parsedData = require("./data/parse-all");


const seed = async () => {
  // first, purge the item and npc databases
  await Npc.deleteMany();
  await Item.deleteMany();

  // then, fill the dbs with fresh data
  const { npcsParsed, itemsParsed } = parsedData;
  await Npc.create(npcsParsed);
  await Item.create(itemsParsed);
}

seed();

module.exports = seed;