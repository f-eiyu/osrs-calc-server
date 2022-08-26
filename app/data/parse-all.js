// imports
const fs = require("fs");
const path = require("path");

// parse npc data dump, discarding some properties that are not helpful to us
// and processing the data to fit the Npc model.
const npcsParsed = [];
const npcIds = fs.readdirSync(path.join(__dirname, "./npcs")).filter(f => path.extname(f) === ".json");

npcIds.forEach(f => {
  const npcData = fs.readFileSync(path.join(__dirname, "/npcs", f));
  const npc = JSON.parse(npcData.toString());

  if (!npc.hitpoints) { return; }

  npc._id = npc.id;
  delete npc.id;

  delete npc.max_hit;
  delete npc.attack_speed;
  delete npc.release_date;
  delete npc.wiki_name;
  delete npc.wiki_url;
  delete npc.slayer_masters;
  delete npc.slayer_level;
  delete npc.slayer_xp;
  delete npc.examine;
  delete npc.drops;
  
  npcsParsed.push(npc);
});


// parse equipment data dump. this one's a little more complicated because the
// file organization is in categories, so we'll have to take some provisions to
// account for that as well. as before, we'll discard the propertie we don't
// need and process the data to fit the Item model.
const itemsParsed = {};
const itemFiles = fs.readdirSync(path.join(__dirname, "/eq")).filter(f => path.extname(f) === ".json");

itemFiles.forEach(f => {
  const slotData = fs.readFileSync(path.join(__dirname, "/eq", f));
  // trim first six characters "items-" and last five characters ".json"
  const slotName = f.slice(6, -5);
  const slotItems = [];
  const slotJson = JSON.parse(slotData.toString());

  for (const item of Object.values(slotJson)) {
    if (!(item.equipable || item.equipable_by_player)) { continue; }

    // most item properties are completely irrelevant to us, so instead of
    // stripping the useless ones (like we did in npcs above), it's more
    // straightforward here to instead retain the relevant ones.
    const itemProcessed = {
      name: item.name,
      last_updated: item.last_updated,
      incomplete: item.incomplete,
      members: item.members,
      placeholder: item.placeholder,
      duplicate: item.duplicate,
      equipment: item.equipment,
      weapon: item.weapon,
      _id: item.id
    }

    slotItems.push(itemProcessed);
  }

  itemsParsed[slotName] = slotItems;
});


// exports
module.exports = {
  npcsParsed,
  itemsParsed
}