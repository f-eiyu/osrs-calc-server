# Old School RuneScape Damage Calculator
A damage calculator for Old School RuneScape (OSRS). There are a handful of existing damage calculators online, but they all suffer from some key UX issue or another (no preset monsters, no user lookup, no way to save loadouts, *being straight up wrong*...), which I do not intend to replicate.

# Planning
## Routes

## Models
- character
  - name
  - stats
    - Attack
    - Strength
    - Defense
    - HP
    - Ranged
    - Magic
    - Prayer
    - Mining (a few niche bosses use this skill to calculate damage)
- loadout
  - [{slot: itemId}] for each equipment slot (head, neck, ammo, body, cape, hands, legs, feet, ring, shield, weapon)
- item
  - id
  - members only
  - stabAtk
  - slashAtk
  - crushAtk
  - stabDef
  - slashDef
  - crushDef
  - rangedAtk
  - rangedDef
  - magicAtk
  - magicDef
  - prayerBonus
  - strengthBonus
  - rangedStrengthBonus
  - magicStrengthBonus
  - passiveCb
- user
  - username
  - password
  - [characters]
  - [loadouts]

## ERDs
Still struggling with the whole "unpacking all our stuff after moving" thing, but again, the ERD is not intended to be the complicated part here.

user ─∈ loadout ─∈ items

&nbsp;&#124;  
M

character

## Seed Data
Seed data will be fetched from the [OSRS Wiki](https://oldschool.runescape.wiki/) and cached locally. The wiki does not have an external API, but data can be fetched using function calls in various Lua scripts, such as [this one](https://oldschool.runescape.wiki/w/Module:Slottable). I will be fetching the appropriate data via said Lua scripts and saving it on the server side, to function as seed data.

An example of seed data can be found at `/data/eq/ammo.json`; there will be many more files just like it, but as each equipment slot needs to be retrieved and downloaded manually, I figured it best to save the bulk of the data download for after the project is actually approved.