window.pokeData = function() {
   var self            = this;
   self.trainers       = [];
   self.trainerPokemon = [];
   self.wildPokemon    = [];
	self.pokemon        = [
	   {'id': 1, 'name': 'Bulbasaur', 'rarity': 'superrare'},
	   {'id': 2, 'name': 'Ivysaur', 'rarity': ''},
	   {'id': 3, 'name': 'Venusaur', 'rarity': ''},
	   {'id': 4, 'name': 'Charmander', 'rarity': 'superrare'},
	   {'id': 5, 'name': 'Charmeleon', 'rarity': ''},
	   {'id': 6, 'name': 'Charizard', 'rarity': ''},
	   {'id': 7, 'name': 'Squirtle', 'rarity': 'superrare'},
	   {'id': 8, 'name': 'Wartortle', 'rarity': ''},
	   {'id': 9, 'name': 'Blastoise', 'rarity': ''},
	   {'id': 10, 'name': 'Caterpie', 'rarity': 'verycommon'},
	   {'id': 11, 'name': 'Metapod', 'rarity': ''},
	   {'id': 12, 'name': 'Butterfree', 'rarity': 'common'},
	   {'id': 13, 'name': 'Weedle', 'rarity': 'verycommon'},
	   {'id': 14, 'name': 'Kakuna', 'rarity': ''},
	   {'id': 15, 'name': 'Beedrill', 'rarity': 'common'},
	   {'id': 16, 'name': 'Pidgey', 'rarity': 'verycommon'},
	   {'id': 17, 'name': 'Pidgeotto', 'rarity': ''},
	   {'id': 18, 'name': 'Pidgeot', 'rarity': ''},
	   {'id': 19, 'name': 'Rattata', 'rarity': 'verycommon'},
	   {'id': 20, 'name': 'Raticate', 'rarity': ''},
	   {'id': 21, 'name': 'Spearow', 'rarity': 'common'},
	   {'id': 22, 'name': 'Fearow', 'rarity': ''},
	   {'id': 23, 'name': 'Ekans', 'rarity': 'common'},
	   {'id': 24, 'name': 'Arbok', 'rarity': ''},
	   {'id': 25, 'name': 'Pikachu', 'rarity': ''},
	   {'id': 26, 'name': 'Raichu', 'rarity': ''},
	   {'id': 27, 'name': 'Sandshrew', 'rarity': 'common'},
	   {'id': 28, 'name': 'Sandslash', 'rarity': ''},
	   {'id': 29, 'name': 'Nidoran', 'rarity': 'common'},
	   {'id': 30, 'name': 'Nidorina', 'rarity': ''},
	   {'id': 31, 'name': 'Nidoqueen', 'rarity': ''},
	   {'id': 32, 'name': 'Nidoran', 'rarity': 'common'},
	   {'id': 33, 'name': 'Nidorino', 'rarity': ''},
	   {'id': 34, 'name': 'Nidoking', 'rarity': ''},
	   {'id': 35, 'name': 'Clefairy', 'rarity': 'rare'},
	   {'id': 36, 'name': 'Clefable', 'rarity': ''},
	   {'id': 37, 'name': 'Vulpix', 'rarity': 'rare'},
	   {'id': 38, 'name': 'Ninetales', 'rarity': ''},
	   {'id': 39, 'name': 'Jigglypuff', 'rarity': 'rare'},
	   {'id': 40, 'name': 'Wigglytuff', 'rarity': ''},
	   {'id': 41, 'name': 'Zubat', 'rarity': 'verycommon'},
	   {'id': 42, 'name': 'Golbat', 'rarity': ''},
	   {'id': 43, 'name': 'Oddish', 'rarity': 'common'},
	   {'id': 44, 'name': 'Gloom', 'rarity': ''},
	   {'id': 45, 'name': 'Vileplume', 'rarity': ''},
	   {'id': 46, 'name': 'Paras', 'rarity': 'rare'},
	   {'id': 47, 'name': 'Parasect', 'rarity': ''},
	   {'id': 48, 'name': 'Venonat', 'rarity': 'common'},
	   {'id': 49, 'name': 'Venomoth', 'rarity': ''},
	   {'id': 50, 'name': 'Diglett', 'rarity': 'rare'},
	   {'id': 51, 'name': 'Dugtrio', 'rarity': ''},
	   {'id': 52, 'name': 'Meowth', 'rarity': 'common'},
	   {'id': 53, 'name': 'Persian', 'rarity': ''},
	   {'id': 54, 'name': 'Psyduck', 'rarity': 'common'},
	   {'id': 55, 'name': 'Golduck', 'rarity': ''},
	   {'id': 56, 'name': 'Mankey', 'rarity': 'veryrare'},
	   {'id': 57, 'name': 'Primeape', 'rarity': ''},
	   {'id': 58, 'name': 'Growlithe', 'rarity': 'common'},
	   {'id': 59, 'name': 'Arcanine', 'rarity': ''},
	   {'id': 60, 'name': 'Poliwag', 'rarity': 'rare'},
	   {'id': 61, 'name': 'Poliwhirl', 'rarity': ''},
	   {'id': 62, 'name': 'Poliwrath', 'rarity': ''},
	   {'id': 63, 'name': 'Abra', 'rarity': 'veryrare'},
	   {'id': 64, 'name': 'Kadabra', 'rarity': ''},
	   {'id': 65, 'name': 'Alakazam', 'rarity': ''},
	   {'id': 66, 'name': 'Machop', 'rarity': 'veryrare'},
	   {'id': 67, 'name': 'Machoke', 'rarity': ''},
	   {'id': 68, 'name': 'Machamp', 'rarity': ''},
	   {'id': 69, 'name': 'Bellsprout', 'rarity': 'common'},
	   {'id': 70, 'name': 'Weepinbell', 'rarity': ''},
	   {'id': 71, 'name': 'Victreebel', 'rarity': ''},
	   {'id': 72, 'name': 'Tentacool', 'rarity': 'common'},
	   {'id': 73, 'name': 'Tentacruel', 'rarity': ''},
	   {'id': 74, 'name': 'Geodude', 'rarity': 'common'},
	   {'id': 75, 'name': 'Graveler', 'rarity': ''},
	   {'id': 76, 'name': 'Golem', 'rarity': ''},
	   {'id': 77, 'name': 'Ponyta', 'rarity': 'rare'},
	   {'id': 78, 'name': 'Rapidash', 'rarity': ''},
	   {'id': 79, 'name': 'Slowpoke', 'rarity': 'veryrare'},
	   {'id': 80, 'name': 'Slowbro', 'rarity': ''},
	   {'id': 81, 'name': 'Magnemite', 'rarity': 'rare'},
	   {'id': 82, 'name': 'Magneton', 'rarity': ''},
	   {'id': 83, 'name': 'Farfetchd', 'rarity': 'rare'},
	   {'id': 84, 'name': 'Doduo', 'rarity': 'common'},
	   {'id': 85, 'name': 'Dodrio', 'rarity': ''},
	   {'id': 86, 'name': 'Seel', 'rarity': 'veryrare'},
	   {'id': 87, 'name': 'Dewgong', 'rarity': ''},
	   {'id': 88, 'name': 'Grimer', 'rarity': 'veryrare'},
	   {'id': 89, 'name': 'Muk', 'rarity': ''},
	   {'id': 90, 'name': 'Shellder', 'rarity': 'rare'},
	   {'id': 91, 'name': 'Cloyster', 'rarity': ''},
	   {'id': 92, 'name': 'Gastly', 'rarity': 'rare'},
	   {'id': 93, 'name': 'Haunter', 'rarity': ''},
	   {'id': 94, 'name': 'Gengar', 'rarity': ''},
	   {'id': 95, 'name': 'Onix', 'rarity': 'veryrare'},
	   {'id': 96, 'name': 'Drowzee', 'rarity': 'rare'},
	   {'id': 97, 'name': 'Hypno', 'rarity': ''},
	   {'id': 98, 'name': 'Krabby', 'rarity': 'rare'},
	   {'id': 99, 'name': 'Kingler', 'rarity': ''},
	   {'id': 100, 'name': 'Voltorb', 'rarity': 'rare'},
	   {'id': 101, 'name': 'Electrode', 'rarity': ''},
	   {'id': 102, 'name': 'Exeggcute', 'rarity': 'common'},
	   {'id': 103, 'name': 'Exeggutor', 'rarity': ''},
	   {'id': 104, 'name': 'Cubone', 'rarity': 'rare'},
	   {'id': 105, 'name': 'Marowak', 'rarity': ''},
	   {'id': 106, 'name': 'Hitmonlee', 'rarity': ''},
	   {'id': 107, 'name': 'Hitmonchan', 'rarity': ''},
	   {'id': 108, 'name': 'Lickitung', 'rarity': 'veryrare'},
	   {'id': 109, 'name': 'Koffing', 'rarity': 'common'},
	   {'id': 110, 'name': 'Weezing', 'rarity': ''},
	   {'id': 111, 'name': 'Rhyhorn', 'rarity': 'veryrare'},
	   {'id': 112, 'name': 'Rhydon', 'rarity': ''},
	   {'id': 113, 'name': 'Chansey', 'rarity': ''},
	   {'id': 114, 'name': 'Tangela', 'rarity': 'veryrare'},
	   {'id': 115, 'name': 'Kangaskhan', 'rarity': 'veryrare'},
	   {'id': 116, 'name': 'Horsea', 'rarity': 'rare'},
	   {'id': 117, 'name': 'Seadra', 'rarity': ''},
	   {'id': 118, 'name': 'Goldeen', 'rarity': 'rare'},
	   {'id': 119, 'name': 'Seaking', 'rarity': ''},
	   {'id': 120, 'name': 'Staryu', 'rarity': 'rare'},
	   {'id': 121, 'name': 'Starmie', 'rarity': ''},
	   {'id': 122, 'name': 'Mr-Mime', 'rarity': 'common'},
	   {'id': 123, 'name': 'Scyther', 'rarity': 'veryrare'},
	   {'id': 124, 'name': 'Jynx', 'rarity': 'rare'},
	   {'id': 125, 'name': 'Electabuzz', 'rarity': 'veryrare'},
	   {'id': 126, 'name': 'Magmar', 'rarity': 'veryrare'},
	   {'id': 127, 'name': 'Pinsir', 'rarity': 'veryrare'},
	   {'id': 128, 'name': 'Tauros', 'rarity': 'veryrare'},
	   {'id': 129, 'name': 'Magikarp', 'rarity': 'Super common'},
	   {'id': 130, 'name': 'Gyarados', 'rarity': ''},
	   {'id': 131, 'name': 'Lapras', 'rarity': 'veryrare'},
	   {'id': 132, 'name': 'Ditto', 'rarity': 'superrare'},
	   {'id': 133, 'name': 'Eevee', 'rarity': 'veryrare'},
	   {'id': 134, 'name': 'Vaporeon', 'rarity': ''},
	   {'id': 135, 'name': 'Jolteon', 'rarity': ''},
	   {'id': 136, 'name': 'Flareon', 'rarity': ''},
	   {'id': 137, 'name': 'Porygon', 'rarity': 'superrare'},
	   {'id': 138, 'name': 'Omanyte', 'rarity': 'superrare'},
	   {'id': 139, 'name': 'Omastar', 'rarity': ''},
	   {'id': 140, 'name': 'Kabuto', 'rarity': 'superrare'},
	   {'id': 141, 'name': 'Kabutops', 'rarity': ''},
	   {'id': 142, 'name': 'Aerodactyl', 'rarity': 'veryrare'},
	   {'id': 143, 'name': 'Snorlax', 'rarity': 'veryrare'},
	   {'id': 144, 'name': 'Articuno', 'rarity': ''},
	   {'id': 145, 'name': 'Zapdos', 'rarity': ''},
	   {'id': 146, 'name': 'Moltres', 'rarity': ''},
	   {'id': 147, 'name': 'Dratini', 'rarity': 'uberrare'},
	   {'id': 148, 'name': 'Dragonair', 'rarity': ''},
	   {'id': 149, 'name': 'Dragonite', 'rarity': ''},
	   {'id': 150, 'name': 'Mewtwo', 'rarity': ''},
	   {'id': 151, 'name': 'Mew', 'rarity': ''},
	   {'id': 152, 'name': 'Chikorita', 'rarity': 'superrare'},
	   {'id': 153, 'name': 'Bayleef', 'rarity': ''},
	   {'id': 154, 'name': 'Meganium', 'rarity': ''},
	   {'id': 155, 'name': 'Cyndaquil', 'rarity': 'superrare'},
	   {'id': 156, 'name': 'Quilava', 'rarity': ''},
	   {'id': 157, 'name': 'Typhlosion', 'rarity': ''},
	   {'id': 158, 'name': 'Totodile', 'rarity': 'superrare'},
	   {'id': 159, 'name': 'Croconaw', 'rarity': ''},
	   {'id': 160, 'name': 'Feraligatr', 'rarity': ''},
	   {'id': 161, 'name': 'Sentret', 'rarity': 'verycommon'},
	   {'id': 162, 'name': 'Furret', 'rarity': 'rare'},
	   {'id': 163, 'name': 'Hoothoot', 'rarity': 'verycommon'},
	   {'id': 164, 'name': 'Noctowl', 'rarity': ''},
	   {'id': 165, 'name': 'Ledyba', 'rarity': 'common'},
	   {'id': 166, 'name': 'Ledian', 'rarity': ''},
	   {'id': 167, 'name': 'Spinarak', 'rarity': 'rare'},
	   {'id': 168, 'name': 'Ariados', 'rarity': ''},
	   {'id': 169, 'name': 'Crobat', 'rarity': ''},
	   {'id': 170, 'name': 'Chinchou', 'rarity': 'verycommon'},
	   {'id': 171, 'name': 'Lanturn', 'rarity': ''},
	   {'id': 172, 'name': 'Pichu', 'rarity': 'veryrare'},
	   {'id': 173, 'name': 'Cleffa', 'rarity': 'veryrare'},
	   {'id': 174, 'name': 'Igglybuff', 'rarity': 'veryrare'},
	   {'id': 175, 'name': 'Togepi', 'rarity': 'veryrare'},
	   {'id': 176, 'name': 'Togetic', 'rarity': ''},
	   {'id': 177, 'name': 'Natu', 'rarity': 'veryrare'},
	   {'id': 178, 'name': 'Xatu', 'rarity': ''},
	   {'id': 179, 'name': 'Mareep', 'rarity': 'rare'},
	   {'id': 180, 'name': 'Flaaffy', 'rarity': 'rare'},
	   {'id': 181, 'name': 'Ampharos', 'rarity': ''},
	   {'id': 182, 'name': 'Bellossom', 'rarity': ''},
	   {'id': 183, 'name': 'Marill', 'rarity': ''},
	   {'id': 184, 'name': 'Azumarill', 'rarity': ''},
	   {'id': 185, 'name': 'Sudowoodo', 'rarity': 'common'},
	   {'id': 186, 'name': 'Politoed', 'rarity': ''},
	   {'id': 187, 'name': 'Hoppip', 'rarity': 'rare'},
	   {'id': 188, 'name': 'Skiploom', 'rarity': ''},
	   {'id': 189, 'name': 'Jumpluff', 'rarity': ''},
	   {'id': 190, 'name': 'Aipom', 'rarity': 'common'},
	   {'id': 191, 'name': 'Sunkern', 'rarity': 'rare'},
	   {'id': 192, 'name': 'Sunflora', 'rarity': ''},
	   {'id': 193, 'name': 'Yanma', 'rarity': 'common'},
	   {'id': 194, 'name': 'Wooper', 'rarity': 'common'},
	   {'id': 195, 'name': 'Quagsire', 'rarity': ''},
	   {'id': 196, 'name': 'Espeon', 'rarity': ''},
	   {'id': 197, 'name': 'Umbreon', 'rarity': ''},
	   {'id': 198, 'name': 'Murkrow', 'rarity': 'rare'},
	   {'id': 199, 'name': 'Slowking', 'rarity': ''},
	   {'id': 200, 'name': 'Misdreavus', 'rarity': 'veryrare'},
	   {'id': 201, 'name': 'Unown', 'rarity': 'rare'},
	   {'id': 202, 'name': 'Wobbuffet', 'rarity': 'rare'},
	   {'id': 203, 'name': 'Girafarig', 'rarity': 'veryrare'},
	   {'id': 204, 'name': 'Pineco', 'rarity': 'common'},
	   {'id': 205, 'name': 'Forretress', 'rarity': ''},
	   {'id': 206, 'name': 'Dunsparce', 'rarity': 'common'},
	   {'id': 207, 'name': 'Gligar', 'rarity': 'veryrare'},
	   {'id': 208, 'name': 'Steelix', 'rarity': ''},
	   {'id': 209, 'name': 'Snubbull', 'rarity': 'common'},
	   {'id': 210, 'name': 'Granbull', 'rarity': ''},
	   {'id': 211, 'name': 'Qwilfish', 'rarity': 'veryrare'},
	   {'id': 212, 'name': 'Scizor', 'rarity': ''},
	   {'id': 213, 'name': 'Shuckle', 'rarity': 'veryrare'},
	   {'id': 214, 'name': 'Heracross', 'rarity': 'veryrare'},
	   {'id': 215, 'name': 'Sneasel', 'rarity': 'veryrare'},
	   {'id': 216, 'name': 'Teddiursa', 'rarity': 'rare'},
	   {'id': 217, 'name': 'Ursaring', 'rarity': ''},
	   {'id': 218, 'name': 'Slugma', 'rarity': 'rare'},
	   {'id': 219, 'name': 'Magcargo', 'rarity': ''},
	   {'id': 220, 'name': 'Swinub', 'rarity': 'common'},
	   {'id': 221, 'name': 'Piloswine', 'rarity': ''},
	   {'id': 222, 'name': 'Corsola', 'rarity': 'rare'},
	   {'id': 223, 'name': 'Remoraid', 'rarity': 'rare'},
	   {'id': 224, 'name': 'Octillery', 'rarity': ''},
	   {'id': 225, 'name': 'Delibird', 'rarity': 'common'},
	   {'id': 226, 'name': 'Mantine', 'rarity': 'common'},
	   {'id': 227, 'name': 'Skarmory', 'rarity': 'veryrare'},
	   {'id': 228, 'name': 'Houndour', 'rarity': 'common'},
	   {'id': 229, 'name': 'Houndoom', 'rarity': ''},
	   {'id': 230, 'name': 'Kingdra', 'rarity': ''},
	   {'id': 231, 'name': 'Phanpy', 'rarity': 'common'},
	   {'id': 232, 'name': 'Donphan', 'rarity': ''},
	   {'id': 233, 'name': 'Porygon2', 'rarity': ''},
	   {'id': 234, 'name': 'Stantler', 'rarity': 'veryrare'},
	   {'id': 235, 'name': 'Smeargle', 'rarity': 'rare'},
	   {'id': 236, 'name': 'Tyrogue', 'rarity': 'veryrare'},
	   {'id': 237, 'name': 'Hitmontop', 'rarity': ''},
	   {'id': 238, 'name': 'Smoochum', 'rarity': 'rare'},
	   {'id': 239, 'name': 'Elekid', 'rarity': 'rare'},
	   {'id': 240, 'name': 'Magby', 'rarity': 'rare'},
	   {'id': 241, 'name': 'Miltank', 'rarity': 'veryrare'},
	   {'id': 242, 'name': 'Blissey', 'rarity': ''},
	   {'id': 243, 'name': 'Raikou', 'rarity': ''},
	   {'id': 244, 'name': 'Entei', 'rarity': ''},
	   {'id': 245, 'name': 'Suicune', 'rarity': ''},
	   {'id': 246, 'name': 'Larvitar', 'rarity': 'uberrare'},
	   {'id': 247, 'name': 'Pupitar', 'rarity': ''},
	   {'id': 248, 'name': 'Tyranitar', 'rarity': ''},
	   {'id': 249, 'name': 'Lugia', 'rarity': ''},
	   {'id': 250, 'name': 'Ho-Oh', 'rarity': ''},
	   {'id': 251, 'name': 'Celebi', 'rarity': ''},
	   {'id': 252, 'name': 'Treecko', 'rarity': 'superrare'},
	   {'id': 253, 'name': 'Grovyle', 'rarity': ''},
	   {'id': 254, 'name': 'Sceptile', 'rarity': ''},
	   {'id': 255, 'name': 'Torchic', 'rarity': 'superrare'},
	   {'id': 256, 'name': 'Combusken', 'rarity': ''},
	   {'id': 257, 'name': 'Blaziken', 'rarity': ''},
	   {'id': 258, 'name': 'Mudkip', 'rarity': 'superrare'},
	   {'id': 259, 'name': 'Marshtomp', 'rarity': ''},
	   {'id': 260, 'name': 'Swampert', 'rarity': ''},
	   {'id': 261, 'name': 'Poochyena', 'rarity': 'verycommon'},
	   {'id': 262, 'name': 'Mightyena', 'rarity': ''},
	   {'id': 263, 'name': 'Zigzagoon', 'rarity': 'verycommon'},
	   {'id': 264, 'name': 'Linoone', 'rarity': ''},
	   {'id': 265, 'name': 'Wurmple', 'rarity': 'verycommon'},
	   {'id': 266, 'name': 'Silcoon', 'rarity': 'rare'},
	   {'id': 267, 'name': 'Beautifly', 'rarity': 'veryrare'},
	   {'id': 268, 'name': 'Cascoon', 'rarity': 'rare'},
	   {'id': 269, 'name': 'Dustox', 'rarity': 'veryrare'},
	   {'id': 270, 'name': 'Lotad', 'rarity': 'common'},
	   {'id': 271, 'name': 'Lombre', 'rarity': 'common'},
	   {'id': 272, 'name': 'Ludicolo', 'rarity': ''},
	   {'id': 273, 'name': 'Seedot', 'rarity': 'common'},
	   {'id': 274, 'name': 'Nuzleaf', 'rarity': 'rare'},
	   {'id': 275, 'name': 'Shiftry', 'rarity': ''},
	   {'id': 276, 'name': 'Taillow', 'rarity': 'common'},
	   {'id': 277, 'name': 'Swellow', 'rarity': ''},
	   {'id': 278, 'name': 'Wingull', 'rarity': 'common'},
	   {'id': 279, 'name': 'Pelipper', 'rarity': ''},
	   {'id': 280, 'name': 'Ralts', 'rarity': 'common'},
	   {'id': 281, 'name': 'Kirlia', 'rarity': ''},
	   {'id': 282, 'name': 'Gardevoir', 'rarity': ''},
	   {'id': 283, 'name': 'Surskit', 'rarity': 'common'},
	   {'id': 284, 'name': 'Masquerain', 'rarity': ''},
	   {'id': 285, 'name': 'Shroomish', 'rarity': 'rare'},
	   {'id': 286, 'name': 'Breloom', 'rarity': ''},
	   {'id': 287, 'name': 'Slakoth', 'rarity': 'common'},
	   {'id': 288, 'name': 'Vigoroth', 'rarity': ''},
	   {'id': 289, 'name': 'Slaking', 'rarity': ''},
	   {'id': 290, 'name': 'Nincada', 'rarity': 'rare'},
	   {'id': 291, 'name': 'Ninjask', 'rarity': ''},
	   {'id': 292, 'name': 'Shedinja', 'rarity': ''},
	   {'id': 293, 'name': 'Whismur', 'rarity': 'rare'},
	   {'id': 294, 'name': 'Loudred', 'rarity': ''},
	   {'id': 295, 'name': 'Exploud', 'rarity': ''},
	   {'id': 296, 'name': 'Makuhita', 'rarity': 'rare'},
	   {'id': 297, 'name': 'Hariyama', 'rarity': ''},
	   {'id': 298, 'name': 'Azurill', 'rarity': 'rare'},
	   {'id': 299, 'name': 'Nosepass', 'rarity': 'rare'},
	   {'id': 300, 'name': 'Skitty', 'rarity': 'rare'},
	   {'id': 301, 'name': 'Delcatty', 'rarity': ''},
	   {'id': 302, 'name': 'Sableye', 'rarity': 'veryrare'},
	   {'id': 303, 'name': 'Mawile', 'rarity': 'veryrare'},
	   {'id': 304, 'name': 'Aron', 'rarity': 'rare'},
	   {'id': 305, 'name': 'Lairon', 'rarity': ''},
	   {'id': 306, 'name': 'Aggron', 'rarity': ''},
	   {'id': 307, 'name': 'Meditite', 'rarity': 'veryrare'},
	   {'id': 308, 'name': 'Medicham', 'rarity': ''},
	   {'id': 309, 'name': 'Electrike', 'rarity': 'rare'},
	   {'id': 310, 'name': 'Manectric', 'rarity': ''},
	   {'id': 311, 'name': 'Plusle', 'rarity': 'rare'},
	   {'id': 312, 'name': 'Minun', 'rarity': 'rare'},
	   {'id': 313, 'name': 'Volbeat', 'rarity': 'rare'},
	   {'id': 314, 'name': 'Illumise', 'rarity': 'rare'},
	   {'id': 315, 'name': 'Roselia', 'rarity': 'rare'},
	   {'id': 316, 'name': 'Gulpin', 'rarity': 'rare'},
	   {'id': 317, 'name': 'Swalot', 'rarity': ''},
	   {'id': 318, 'name': 'Carvanha', 'rarity': 'rare'},
	   {'id': 319, 'name': 'Sharpedo', 'rarity': ''},
	   {'id': 320, 'name': 'Wailmer', 'rarity': 'rare'},
	   {'id': 321, 'name': 'Wailord', 'rarity': ''},
	   {'id': 322, 'name': 'Numel', 'rarity': 'rare'},
	   {'id': 323, 'name': 'Camerupt', 'rarity': ''},
	   {'id': 324, 'name': 'Torkoal', 'rarity': 'veryrare'},
	   {'id': 325, 'name': 'Spoink', 'rarity': 'common'},
	   {'id': 326, 'name': 'Grumpig', 'rarity': ''},
	   {'id': 327, 'name': 'Spinda', 'rarity': 'common'},
	   {'id': 328, 'name': 'Trapinch', 'rarity': 'rare'},
	   {'id': 329, 'name': 'Vibrava', 'rarity': ''},
	   {'id': 330, 'name': 'Flygon', 'rarity': ''},
	   {'id': 331, 'name': 'Cacnea', 'rarity': 'common'},
	   {'id': 332, 'name': 'Cacturne', 'rarity': ''},
	   {'id': 333, 'name': 'Swablu', 'rarity': 'veryrare'},
	   {'id': 334, 'name': 'Altaria', 'rarity': ''},
	   {'id': 335, 'name': 'Zangoose', 'rarity': 'veryrare'},
	   {'id': 336, 'name': 'Seviper', 'rarity': 'veryrare'},
	   {'id': 337, 'name': 'Lunatone', 'rarity': 'veryrare'},
	   {'id': 338, 'name': 'Solrock', 'rarity': 'veryrare'},
	   {'id': 339, 'name': 'Barboach', 'rarity': 'rare'},
	   {'id': 340, 'name': 'Whiscash', 'rarity': ''},
	   {'id': 341, 'name': 'Corphish', 'rarity': 'common'},
	   {'id': 342, 'name': 'Crawdaunt', 'rarity': ''},
	   {'id': 343, 'name': 'Baltoy', 'rarity': 'rare'},
	   {'id': 344, 'name': 'Claydol', 'rarity': ''},
	   {'id': 345, 'name': 'Lileep', 'rarity': 'common'},
	   {'id': 346, 'name': 'Cradily', 'rarity': ''},
	   {'id': 347, 'name': 'Anorith', 'rarity': 'common'},
	   {'id': 348, 'name': 'Armaldo', 'rarity': ''},
	   {'id': 349, 'name': 'Feebas', 'rarity': 'veryrare'},
	   {'id': 350, 'name': 'Milotic', 'rarity': ''},
	   {'id': 351, 'name': 'Castform', 'rarity': 'rare'},
	   {'id': 352, 'name': 'Kecleon', 'rarity': 'veryrare'},
	   {'id': 353, 'name': 'Shuppet', 'rarity': 'rare'},
	   {'id': 354, 'name': 'Banette', 'rarity': ''},
	   {'id': 355, 'name': 'Duskull', 'rarity': 'rare'},
	   {'id': 356, 'name': 'Dusclops', 'rarity': ''},
	   {'id': 357, 'name': 'Tropius', 'rarity': 'veryrare'},
	   {'id': 358, 'name': 'Chimecho', 'rarity': 'rare'},
	   {'id': 359, 'name': 'Absol', 'rarity': 'veryrare'},
	   {'id': 360, 'name': 'Wynaut', 'rarity': 'rare'},
	   {'id': 361, 'name': 'Snorunt', 'rarity': 'common'},
	   {'id': 362, 'name': 'Glalie', 'rarity': ''},
	   {'id': 363, 'name': 'Spheal', 'rarity': 'common'},
	   {'id': 364, 'name': 'Sealeo', 'rarity': ''},
	   {'id': 365, 'name': 'Walrein', 'rarity': ''},
	   {'id': 366, 'name': 'Clamperl', 'rarity': 'rare'},
	   {'id': 367, 'name': 'Huntail', 'rarity': ''},
	   {'id': 368, 'name': 'Gorebyss', 'rarity': ''},
	   {'id': 369, 'name': 'Relicanth', 'rarity': 'veryrare'},
	   {'id': 370, 'name': 'Luvdisc', 'rarity': 'rare'},
	   {'id': 371, 'name': 'Bagon', 'rarity': 'uberrare'},
	   {'id': 372, 'name': 'Shelgon', 'rarity': ''},
	   {'id': 373, 'name': 'Salamence', 'rarity': ''},
	   {'id': 374, 'name': 'Beldum', 'rarity': ''},
	   {'id': 375, 'name': 'Metang', 'rarity': ''},
	   {'id': 376, 'name': 'Metagross', 'rarity': ''},
	   {'id': 377, 'name': 'Regirock', 'rarity': 'uberrare'},
	   {'id': 378, 'name': 'Regice', 'rarity': 'uberrare'},
	   {'id': 379, 'name': 'Registeel', 'rarity': 'uberrare'},
	   {'id': 380, 'name': 'Latias', 'rarity': ''},
	   {'id': 381, 'name': 'Latios', 'rarity': ''},
	   {'id': 382, 'name': 'Kyogre', 'rarity': ''},
	   {'id': 383, 'name': 'Groudon', 'rarity': ''},
	   {'id': 384, 'name': 'Rayquaza', 'rarity': ''},
	   {'id': 385, 'name': 'Jirachi', 'rarity': ''},
	   {'id': 386, 'name': 'Deoxys-Normal', 'rarity': ''},
	   {'id': 387, 'name': 'Turtwig', 'rarity': 'superrare'},
	   {'id': 388, 'name': 'Grotle', 'rarity': ''},
	   {'id': 389, 'name': 'Torterra', 'rarity': ''},
	   {'id': 390, 'name': 'Chimchar', 'rarity': 'superrare'},
	   {'id': 391, 'name': 'Monferno', 'rarity': ''},
	   {'id': 392, 'name': 'Infernape', 'rarity': ''},
	   {'id': 393, 'name': 'Piplup', 'rarity': 'superrare'},
	   {'id': 394, 'name': 'Prinplup', 'rarity': ''},
	   {'id': 395, 'name': 'Empoleon', 'rarity': ''},
	   {'id': 396, 'name': 'Starly', 'rarity': 'verycommon'},
	   {'id': 397, 'name': 'Staravia', 'rarity': 'rare'},
	   {'id': 398, 'name': 'Staraptor', 'rarity': ''},
	   {'id': 399, 'name': 'Bidoof', 'rarity': 'verycommon'},
	   {'id': 400, 'name': 'Bibarel', 'rarity': ''},
	   {'id': 401, 'name': 'Kricketot', 'rarity': 'common'},
	   {'id': 402, 'name': 'Kricketune', 'rarity': ''},
	   {'id': 403, 'name': 'Shinx', 'rarity': 'rare'},
	   {'id': 404, 'name': 'Luxio', 'rarity': ''},
	   {'id': 405, 'name': 'Luxray', 'rarity': ''},
	   {'id': 406, 'name': 'Budew', 'rarity': 'rare'},
	   {'id': 407, 'name': 'Roserade', 'rarity': ''},
	   {'id': 408, 'name': 'Cranidos', 'rarity': 'veryrare'},
	   {'id': 409, 'name': 'Rampardos', 'rarity': ''},
	   {'id': 410, 'name': 'Shieldon', 'rarity': 'veryrare'},
	   {'id': 411, 'name': 'Bastiodon', 'rarity': ''},
	   {'id': 412, 'name': 'Burmy', 'rarity': 'rare'},
	   {'id': 413, 'name': 'Wormadam-Plant', 'rarity': ''},
	   {'id': 414, 'name': 'Mothim', 'rarity': ''},
	   {'id': 415, 'name': 'Combee', 'rarity': 'rare'},
	   {'id': 416, 'name': 'Vespiquen', 'rarity': ''},
	   {'id': 417, 'name': 'Pachirisu', 'rarity': 'veryrare'},
	   {'id': 418, 'name': 'Buizel', 'rarity': 'veryrare'},
	   {'id': 419, 'name': 'Floatzel', 'rarity': ''},
	   {'id': 420, 'name': 'Cherubi', 'rarity': 'common'},
	   {'id': 421, 'name': 'Cherrim', 'rarity': ''},
	   {'id': 422, 'name': 'Shellos', 'rarity': 'rare'},
	   {'id': 423, 'name': 'Gastrodon', 'rarity': ''},
	   {'id': 424, 'name': 'Ambipom', 'rarity': ''},
	   {'id': 425, 'name': 'Drifloon', 'rarity': 'veryrare'},
	   {'id': 426, 'name': 'Drifblim', 'rarity': ''},
	   {'id': 427, 'name': 'Buneary', 'rarity': 'veryrare'},
	   {'id': 428, 'name': 'Lopunny', 'rarity': ''},
	   {'id': 429, 'name': 'Mismagius', 'rarity': ''},
	   {'id': 430, 'name': 'Honchkrow', 'rarity': ''},
	   {'id': 431, 'name': 'Glameow', 'rarity': 'veryrare'},
	   {'id': 432, 'name': 'Purugly', 'rarity': ''},
	   {'id': 433, 'name': 'Chingling', 'rarity': 'rare'},
	   {'id': 434, 'name': 'Stunky', 'rarity': 'rare'},
	   {'id': 435, 'name': 'Skuntank', 'rarity': ''},
	   {'id': 436, 'name': 'Bronzor', 'rarity': 'common'},
	   {'id': 437, 'name': 'Bronzong', 'rarity': ''},
	   {'id': 438, 'name': 'Bonsly', 'rarity': 'rare'},
	   {'id': 439, 'name': 'Mime-Jr', 'rarity': 'veryrare'},
	   {'id': 440, 'name': 'Happiny', 'rarity': 'rare'},
	   {'id': 441, 'name': 'Chatot', 'rarity': 'veryrare'},
	   {'id': 442, 'name': 'Spiritomb', 'rarity': 'veryrare'},
	   {'id': 443, 'name': 'Gible', 'rarity': ''},
	   {'id': 444, 'name': 'Gabite', 'rarity': ''},
	   {'id': 445, 'name': 'Garchomp', 'rarity': ''},
	   {'id': 446, 'name': 'Munchlax', 'rarity': 'veryrare'},
	   {'id': 447, 'name': 'Riolu', 'rarity': 'rare'},
	   {'id': 448, 'name': 'Lucario', 'rarity': ''},
	   {'id': 449, 'name': 'Hippopotas', 'rarity': 'veryrare'},
	   {'id': 450, 'name': 'Hippowdon', 'rarity': ''},
	   {'id': 451, 'name': 'Skorupi', 'rarity': 'veryrare'},
	   {'id': 452, 'name': 'Drapion', 'rarity': ''},
	   {'id': 453, 'name': 'Croagunk', 'rarity': 'rare'},
	   {'id': 454, 'name': 'Toxicroak', 'rarity': ''},
	   {'id': 455, 'name': 'Carnivine', 'rarity': 'veryrare'},
	   {'id': 456, 'name': 'Finneon', 'rarity': 'rare'},
	   {'id': 457, 'name': 'Lumineon', 'rarity': ''},
	   {'id': 458, 'name': 'Mantyke', 'rarity': 'veryrare'},
	   {'id': 459, 'name': 'Snover', 'rarity': 'veryrare'},
	   {'id': 460, 'name': 'Abomasnow', 'rarity': ''},
	   {'id': 461, 'name': 'Weavile', 'rarity': ''},
	   {'id': 462, 'name': 'Magnezone', 'rarity': ''},
	   {'id': 463, 'name': 'Lickilicky', 'rarity': ''},
	   {'id': 464, 'name': 'Rhyperior', 'rarity': ''},
	   {'id': 465, 'name': 'Tangrowth', 'rarity': ''},
	   {'id': 466, 'name': 'Electivire', 'rarity': ''},
	   {'id': 467, 'name': 'Magmortar', 'rarity': ''},
	   {'id': 468, 'name': 'Togekiss', 'rarity': ''},
	   {'id': 469, 'name': 'Yanmega', 'rarity': ''},
	   {'id': 470, 'name': 'Leafeon', 'rarity': ''},
	   {'id': 471, 'name': 'Glaceon', 'rarity': ''},
	   {'id': 472, 'name': 'Gliscor', 'rarity': ''},
	   {'id': 473, 'name': 'Mamoswine', 'rarity': ''},
	   {'id': 474, 'name': 'Porygon-Z', 'rarity': ''},
	   {'id': 475, 'name': 'Gallade', 'rarity': ''},
	   {'id': 476, 'name': 'Probopass', 'rarity': ''},
	   {'id': 477, 'name': 'Dusknoir', 'rarity': ''},
	   {'id': 478, 'name': 'Froslass', 'rarity': ''},
	   {'id': 479, 'name': 'Rotom', 'rarity': 'veryrare'},
	   {'id': 480, 'name': 'Uxie', 'rarity': ''},
	   {'id': 481, 'name': 'Mesprit', 'rarity': ''},
	   {'id': 482, 'name': 'Azelf', 'rarity': ''},
	   {'id': 483, 'name': 'Dialga', 'rarity': ''},
	   {'id': 484, 'name': 'Palkia', 'rarity': ''},
	   {'id': 485, 'name': 'Heatran', 'rarity': ''},
	   {'id': 486, 'name': 'Regigigas', 'rarity': ''},
	   {'id': 487, 'name': 'Giratina-Altered', 'rarity': ''},
	   {'id': 488, 'name': 'Cresselia', 'rarity': ''},
	   {'id': 489, 'name': 'Phione', 'rarity': ''},
	   {'id': 490, 'name': 'Manaphy', 'rarity': ''},
	   {'id': 491, 'name': 'Darkrai', 'rarity': ''},
	   {'id': 492, 'name': 'Shaymin-Land', 'rarity': ''},
	   {'id': 493, 'name': 'Arceus', 'rarity': ''},
	   {'id': 494, 'name': 'Victini', 'rarity': ''},
	   {'id': 495, 'name': 'Snivy', 'rarity': 'superrare'},
	   {'id': 496, 'name': 'Servine', 'rarity': ''},
	   {'id': 497, 'name': 'Serperior', 'rarity': ''},
	   {'id': 498, 'name': 'Tepig', 'rarity': 'superrare'},
	   {'id': 499, 'name': 'Pignite', 'rarity': ''},
	   {'id': 500, 'name': 'Emboar', 'rarity': ''},
	   {'id': 501, 'name': 'Oshawott', 'rarity': 'superrare'},
	   {'id': 502, 'name': 'Dewott', 'rarity': ''},
	   {'id': 503, 'name': 'Samurott', 'rarity': ''},
	   {'id': 504, 'name': 'Patrat', 'rarity': 'rare'},
	   {'id': 505, 'name': 'Watchog', 'rarity': ''},
	   {'id': 506, 'name': 'Lillipup', 'rarity': 'rare'},
	   {'id': 507, 'name': 'Herdier', 'rarity': ''},
	   {'id': 508, 'name': 'Stoutland', 'rarity': ''},
	   {'id': 509, 'name': 'Purrloin', 'rarity': 'rare'},
	   {'id': 510, 'name': 'Liepard', 'rarity': ''},
	   {'id': 511, 'name': 'Pansage', 'rarity': 'veryrare'},
	   {'id': 512, 'name': 'Simisage', 'rarity': ''},
	   {'id': 513, 'name': 'Pansear', 'rarity': 'veryrare'},
	   {'id': 514, 'name': 'Simisear', 'rarity': ''},
	   {'id': 515, 'name': 'Panpour', 'rarity': 'veryrare'},
	   {'id': 516, 'name': 'Simipour', 'rarity': ''},
	   {'id': 517, 'name': 'Munna', 'rarity': 'rare'},
	   {'id': 518, 'name': 'Musharna', 'rarity': ''},
	   {'id': 519, 'name': 'Pidove', 'rarity': 'common'},
	   {'id': 520, 'name': 'Tranquill', 'rarity': ''},
	   {'id': 521, 'name': 'Unfezant', 'rarity': ''},
	   {'id': 522, 'name': 'Blitzle', 'rarity': 'common'},
	   {'id': 523, 'name': 'Zebstrika', 'rarity': ''},
	   {'id': 524, 'name': 'Roggenrola', 'rarity': 'rare'},
	   {'id': 525, 'name': 'Boldore', 'rarity': ''},
	   {'id': 526, 'name': 'Gigalith', 'rarity': ''},
	   {'id': 527, 'name': 'Woobat', 'rarity': 'veryrare'},
	   {'id': 528, 'name': 'Swoobat', 'rarity': ''},
	   {'id': 529, 'name': 'Drilbur', 'rarity': 'veryrare'},
	   {'id': 530, 'name': 'Excadrill', 'rarity': ''},
	   {'id': 531, 'name': 'Audino', 'rarity': 'veryrare'},
	   {'id': 532, 'name': 'Timburr', 'rarity': 'veryrare'},
	   {'id': 533, 'name': 'Gurdurr', 'rarity': ''},
	   {'id': 534, 'name': 'Conkeldurr', 'rarity': ''},
	   {'id': 535, 'name': 'Tympole', 'rarity': 'rare'},
	   {'id': 536, 'name': 'Palpitoad', 'rarity': ''},
	   {'id': 537, 'name': 'Seismitoad', 'rarity': ''},
	   {'id': 538, 'name': 'Throh', 'rarity': 'veryrare'},
	   {'id': 539, 'name': 'Sawk', 'rarity': 'veryrare'},
	   {'id': 540, 'name': 'Sewaddle', 'rarity': 'rare'},
	   {'id': 541, 'name': 'Swadloon', 'rarity': ''},
	   {'id': 542, 'name': 'Leavanny', 'rarity': ''},
	   {'id': 543, 'name': 'Venipede', 'rarity': 'rare'},
	   {'id': 544, 'name': 'Whirlipede', 'rarity': ''},
	   {'id': 545, 'name': 'Scolipede', 'rarity': ''},
	   {'id': 546, 'name': 'Cottonee', 'rarity': 'rare'},
	   {'id': 547, 'name': 'Whimsicott', 'rarity': ''},
	   {'id': 548, 'name': 'Petilil', 'rarity': 'rare'},
	   {'id': 549, 'name': 'Lilligant', 'rarity': ''},
	   {'id': 550, 'name': 'Basculin', 'rarity': 'veryrare'},
	   {'id': 551, 'name': 'Sandile', 'rarity': 'rare'},
	   {'id': 552, 'name': 'Krokorok', 'rarity': ''},
	   {'id': 553, 'name': 'Krookodile', 'rarity': ''},
	   {'id': 554, 'name': 'Darumaka', 'rarity': 'veryrare'},
	   {'id': 555, 'name': 'Darmanitan-Standard', 'rarity': ''},
	   {'id': 556, 'name': 'Maractus', 'rarity': 'veryrare'},
	   {'id': 557, 'name': 'Dwebble', 'rarity': 'veryrare'},
	   {'id': 558, 'name': 'Crustle', 'rarity': ''},
	   {'id': 559, 'name': 'Scraggy', 'rarity': 'veryrare'},
	   {'id': 560, 'name': 'Scrafty', 'rarity': ''},
	   {'id': 561, 'name': 'Sigilyph', 'rarity': 'veryrare'},
	   {'id': 562, 'name': 'Yamask', 'rarity': 'veryrare'},
	   {'id': 563, 'name': 'Cofagrigus', 'rarity': ''},
	   {'id': 564, 'name': 'Tirtouga', 'rarity': 'veryrare'},
	   {'id': 565, 'name': 'Carracosta', 'rarity': ''},
	   {'id': 566, 'name': 'Archen', 'rarity': 'veryrare'},
	   {'id': 567, 'name': 'Archeops', 'rarity': ''},
	   {'id': 568, 'name': 'Trubbish', 'rarity': 'veryrare'},
	   {'id': 569, 'name': 'Garbodor', 'rarity': ''},
	   {'id': 570, 'name': 'Zorua', 'rarity': 'veryrare'},
	   {'id': 571, 'name': 'Zoroark', 'rarity': ''},
	   {'id': 572, 'name': 'Minccino', 'rarity': 'rare'},
	   {'id': 573, 'name': 'Cinccino', 'rarity': ''},
	   {'id': 574, 'name': 'Gothita', 'rarity': 'rare'},
	   {'id': 575, 'name': 'Gothorita', 'rarity': ''},
	   {'id': 576, 'name': 'Gothitelle', 'rarity': ''},
	   {'id': 577, 'name': 'Solosis', 'rarity': 'rare'},
	   {'id': 578, 'name': 'Duosion', 'rarity': ''},
	   {'id': 579, 'name': 'Reuniclus', 'rarity': ''},
	   {'id': 580, 'name': 'Ducklett', 'rarity': 'veryrare'},
	   {'id': 581, 'name': 'Swanna', 'rarity': ''},
	   {'id': 582, 'name': 'Vanillite', 'rarity': 'veryrare'},
	   {'id': 583, 'name': 'Vanillish', 'rarity': ''},
	   {'id': 584, 'name': 'Vanilluxe', 'rarity': ''},
	   {'id': 585, 'name': 'Deerling', 'rarity': 'veryrare'},
	   {'id': 586, 'name': 'Sawsbuck', 'rarity': ''},
	   {'id': 587, 'name': 'Emolga', 'rarity': 'veryrare'},
	   {'id': 588, 'name': 'Karrablast', 'rarity': 'veryrare'},
	   {'id': 589, 'name': 'Escavalier', 'rarity': ''},
	   {'id': 590, 'name': 'Foongus', 'rarity': 'rare'},
	   {'id': 591, 'name': 'Amoonguss', 'rarity': ''},
	   {'id': 592, 'name': 'Frillish', 'rarity': 'veryrare'},
	   {'id': 593, 'name': 'Jellicent', 'rarity': ''},
	   {'id': 594, 'name': 'Alomomola', 'rarity': 'veryrare'},
	   {'id': 595, 'name': 'Joltik', 'rarity': 'veryrare'},
	   {'id': 596, 'name': 'Galvantula', 'rarity': ''},
	   {'id': 597, 'name': 'Ferroseed', 'rarity': 'veryrare'},
	   {'id': 598, 'name': 'Ferrothorn', 'rarity': ''},
	   {'id': 599, 'name': 'Klink', 'rarity': 'rare'},
	   {'id': 600, 'name': 'Klang', 'rarity': ''},
	   {'id': 601, 'name': 'Klinklang', 'rarity': ''},
	   {'id': 602, 'name': 'Tynamo', 'rarity': 'rare'},
	   {'id': 603, 'name': 'Eelektrik', 'rarity': ''},
	   {'id': 604, 'name': 'Eelektross', 'rarity': ''},
	   {'id': 605, 'name': 'Elgyem', 'rarity': 'veryrare'},
	   {'id': 606, 'name': 'Beheeyem', 'rarity': ''},
	   {'id': 607, 'name': 'Litwick', 'rarity': 'rare'},
	   {'id': 608, 'name': 'Lampent', 'rarity': ''},
	   {'id': 609, 'name': 'Chandelure', 'rarity': ''},
	   {'id': 610, 'name': 'Axew', 'rarity': 'veryrare'},
	   {'id': 611, 'name': 'Fraxure', 'rarity': ''},
	   {'id': 612, 'name': 'Haxorus', 'rarity': ''},
	   {'id': 613, 'name': 'Cubchoo', 'rarity': 'veryrare'},
	   {'id': 614, 'name': 'Beartic', 'rarity': ''},
	   {'id': 615, 'name': 'Cryogonal', 'rarity': 'veryrare'},
	   {'id': 616, 'name': 'Shelmet', 'rarity': 'veryrare'},
	   {'id': 617, 'name': 'Accelgor', 'rarity': ''},
	   {'id': 618, 'name': 'Stunfisk', 'rarity': 'veryrare'},
	   {'id': 619, 'name': 'Mienfoo', 'rarity': 'veryrare'},
	   {'id': 620, 'name': 'Mienshao', 'rarity': ''},
	   {'id': 621, 'name': 'Druddigon', 'rarity': 'veryrare'},
	   {'id': 622, 'name': 'Golett', 'rarity': 'veryrare'},
	   {'id': 623, 'name': 'Golurk', 'rarity': ''},
	   {'id': 624, 'name': 'Pawniard', 'rarity': 'veryrare'},
	   {'id': 625, 'name': 'Bisharp', 'rarity': ''},
	   {'id': 626, 'name': 'Bouffalant', 'rarity': 'veryrare'},
	   {'id': 627, 'name': 'Rufflet', 'rarity': 'veryrare'},
	   {'id': 628, 'name': 'Braviary', 'rarity': ''},
	   {'id': 629, 'name': 'Vullaby', 'rarity': 'veryrare'},
	   {'id': 630, 'name': 'Mandibuzz', 'rarity': ''},
	   {'id': 631, 'name': 'Heatmor', 'rarity': 'veryrare'},
	   {'id': 632, 'name': 'Durant', 'rarity': 'veryrare'},
	   {'id': 633, 'name': 'Deino', 'rarity': ''},
	   {'id': 634, 'name': 'Zweilous', 'rarity': ''},
	   {'id': 635, 'name': 'Hydreigon', 'rarity': ''},
	   {'id': 636, 'name': 'Larvesta', 'rarity': 'veryrare'},
	   {'id': 637, 'name': 'Volcarona', 'rarity': ''},
	   {'id': 638, 'name': 'Cobalion', 'rarity': ''},
	   {'id': 639, 'name': 'Terrakion', 'rarity': ''},
	   {'id': 640, 'name': 'Virizion', 'rarity': ''},
	   {'id': 641, 'name': 'Tornadus', 'rarity': ''},
	   {'id': 642, 'name': 'Thundurus', 'rarity': ''},
	   {'id': 643, 'name': 'Reshiram', 'rarity': ''},
	   {'id': 644, 'name': 'Zekrom', 'rarity': ''},
	   {'id': 645, 'name': 'Landorus', 'rarity': ''},
	   {'id': 646, 'name': 'Kyurem', 'rarity': ''},
	   {'id': 647, 'name': 'Keldeo', 'rarity': ''},
	   {'id': 648, 'name': 'Meloetta', 'rarity': ''},
	   {'id': 649, 'name': 'Genesect', 'rarity': ''},
	   {'id': 650, 'name': 'Chespin', 'rarity': 'superrare'},
	   {'id': 651, 'name': 'Quilladin', 'rarity': ''},
	   {'id': 652, 'name': 'Chesnaught', 'rarity': ''},
	   {'id': 653, 'name': 'Fennekin', 'rarity': 'superrare'},
	   {'id': 654, 'name': 'Braixen', 'rarity': ''},
	   {'id': 655, 'name': 'Delphox', 'rarity': ''},
	   {'id': 656, 'name': 'Froakie', 'rarity': 'superrare'},
	   {'id': 657, 'name': 'Frogadier', 'rarity': ''},
	   {'id': 658, 'name': 'Greninja', 'rarity': ''},
	   {'id': 659, 'name': 'Bunnelby', 'rarity': 'rare'},
	   {'id': 660, 'name': 'Diggersby', 'rarity': ''},
	   {'id': 661, 'name': 'Fletchling', 'rarity': 'rare'},
	   {'id': 662, 'name': 'Fletchinder', 'rarity': ''},
	   {'id': 663, 'name': 'Talonflame', 'rarity': ''},
	   {'id': 664, 'name': 'Scatterbug', 'rarity': 'rare'},
	   {'id': 665, 'name': 'Spewpa', 'rarity': ''},
	   {'id': 666, 'name': 'Vivillon', 'rarity': ''},
	   {'id': 667, 'name': 'Litleo', 'rarity': 'veryrare'},
	   {'id': 668, 'name': 'Pyroar', 'rarity': ''},
	   {'id': 669, 'name': 'Flabebe', 'rarity': 'veryrare'},
	   {'id': 670, 'name': 'Floette', 'rarity': ''},
	   {'id': 671, 'name': 'Florges', 'rarity': ''},
	   {'id': 672, 'name': 'Skiddo', 'rarity': 'veryrare'},
	   {'id': 673, 'name': 'Gogoat', 'rarity': ''},
	   {'id': 674, 'name': 'Pancham', 'rarity': 'veryrare'},
	   {'id': 675, 'name': 'Pangoro', 'rarity': ''},
	   {'id': 676, 'name': 'Furfrou', 'rarity': 'veryrare'},
	   {'id': 677, 'name': 'Espurr', 'rarity': 'veryrare'},
	   {'id': 678, 'name': 'Meowstic-Male', 'rarity': ''},
	   {'id': 679, 'name': 'Honedge', 'rarity': 'veryrare'},
	   {'id': 680, 'name': 'Doublade', 'rarity': ''},
	   {'id': 681, 'name': 'Aegislash-Shield', 'rarity': ''},
	   {'id': 682, 'name': 'Spritzee', 'rarity': 'veryrare'},
	   {'id': 683, 'name': 'Aromatisse', 'rarity': ''},
	   {'id': 684, 'name': 'Swirlix', 'rarity': 'veryrare'},
	   {'id': 685, 'name': 'Slurpuff', 'rarity': ''},
	   {'id': 686, 'name': 'Inkay', 'rarity': 'rare'},
	   {'id': 687, 'name': 'Malamar', 'rarity': ''},
	   {'id': 688, 'name': 'Binacle', 'rarity': 'veryrare'},
	   {'id': 689, 'name': 'Barbaracle', 'rarity': ''},
	   {'id': 690, 'name': 'Skrelp', 'rarity': 'veryrare'},
	   {'id': 691, 'name': 'Dragalge', 'rarity': ''},
	   {'id': 692, 'name': 'Clauncher', 'rarity': 'veryrare'},
	   {'id': 693, 'name': 'Clawitzer', 'rarity': ''},
	   {'id': 694, 'name': 'Helioptile', 'rarity': 'rare'},
	   {'id': 695, 'name': 'Heliolisk', 'rarity': ''},
	   {'id': 696, 'name': 'Tyrunt', 'rarity': 'veryrare'},
	   {'id': 697, 'name': 'Tyrantrum', 'rarity': ''},
	   {'id': 698, 'name': 'Amaura', 'rarity': 'veryrare'},
	   {'id': 699, 'name': 'Aurorus', 'rarity': ''},
	   {'id': 700, 'name': 'Sylveon', 'rarity': ''},
	   {'id': 701, 'name': 'Hawlucha', 'rarity': 'veryrare'},
	   {'id': 702, 'name': 'Dedenne', 'rarity': 'veryrare'},
	   {'id': 703, 'name': 'Carbink', 'rarity': 'veryrare'},
	   {'id': 704, 'name': 'Goomy', 'rarity': ''},
	   {'id': 705, 'name': 'Sliggoo', 'rarity': ''},
	   {'id': 706, 'name': 'Goodra', 'rarity': ''},
	   {'id': 707, 'name': 'Klefki', 'rarity': 'veryrare'},
	   {'id': 708, 'name': 'Phantump', 'rarity': 'veryrare'},
	   {'id': 709, 'name': 'Trevenant', 'rarity': ''},
	   {'id': 710, 'name': 'Pumpkaboo', 'rarity': 'veryrare'},
	   {'id': 711, 'name': 'Gourgeist', 'rarity': ''},
	   {'id': 712, 'name': 'Bergmite', 'rarity': 'veryrare'},
	   {'id': 713, 'name': 'Avalugg', 'rarity': ''},
	   {'id': 714, 'name': 'Noibat', 'rarity': 'rare'},
	   {'id': 715, 'name': 'Noivern', 'rarity': ''},
	   {'id': 716, 'name': 'Xerneas', 'rarity': ''},
	   {'id': 717, 'name': 'Yveltal', 'rarity': ''},
	   {'id': 718, 'name': 'Zygarde', 'rarity': ''},
	   {'id': 719, 'name': 'Diancie', 'rarity': ''},
	   {'id': 720, 'name': 'Hoopa', 'rarity': ''},
	   {'id': 721, 'name': 'Volcanion', 'rarity': ''}
	];   
};
