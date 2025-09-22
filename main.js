// data/names.ts
define("data/names", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lastNames = exports.firstNames = void 0;
    exports.generateName = generateName;
    exports.firstNames = [
        "Agnes", "Beatrice", "Cora", "Della", "Edna", "Florence", "Gladys", "Hattie",
        "Irene", "Josephine", "Lenora", "Mabel", "Nellie", "Opal", "Pearl", "Queenie",
        "Ruth", "Sylvia", "Thelma", "Velma", "Wilma", "Zelda",
        "Avis", "Bernice", "Clara", "Dorothy", "Eunice", "Faye", "Goldie", "Hazel",
        "Ida", "June", "Lillian", "Mamie", "Nina", "Olive", "Prudence", "Rosalie",
        "Susie", "Tilda", "Viola", "Winifred",
        "Albert", "Bernard", "Clyde", "Doyle", "Elmer", "Floyd", "Grover", "Herman",
        "Irving", "Jasper", "Lloyd", "Morris", "Norman", "Orville", "Percy", "Quincy",
        "Rufus", "Sidney", "Truman", "Vernon", "Wilbur", "Zeke",
        "Archie", "Buford", "Chester", "Delbert", "Earl", "Franklin", "Gilbert", "Harold",
        "Ira", "Judson", "Kenneth", "Leland", "Milton", "Norris", "Oscar", "Porter",
        "Raymond", "Sherman", "Thaddeus", "Warren", "Koutsi", "Jenni", "JP", "Otto", "Petri"
    ];
    exports.lastNames = [
        "Ashcroft", "Benedict", "Chamberlain", "Dunbar", "Ellsworth", "Fairchild",
        "Gainsborough", "Harrington", "Inglewood", "Jennings", "Kingsley", "Lancaster",
        "Merriweather", "Northwood", "Oakley", "Pennington", "Quimby", "Rutherford",
        "Sedgewick", "Thornhill", "Underwood", "Vanderbilt", "Wadsworth", "Yorke", "Zabriskie",
        "Abernathy", "Blackwood", "Carrington", "Devereux", "Eastwick", "Fitzgerald",
        "Grimsley", "Hollingsworth", "Iverson", "Jardine", "Kenworthy", "Litchfield",
        "Montague", "Norcross", "Osgood", "Pemberton", "Ravensdale", "Sinclair",
        "Tolliver", "Upton", "Vexley", "Whitmore", "Yarborough", "Zane"
    ];
    function generateName() {
        const first = exports.firstNames[Math.floor(Math.random() * exports.firstNames.length)];
        const last = exports.lastNames[Math.floor(Math.random() * exports.lastNames.length)];
        return `${first} ${last}`;
    }
});
// data/occupations.ts
define("data/occupations", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.occupationItems = exports.occupations = void 0;
    exports.occupations = [
        "Private Investigator", "Jazz Musician", "Bootlegger", "Occult Scholar",
        "Flapper", "Newsboy", "Factory Worker", "Con Artist", "Radio Host", "Librarian",
        "Street Magician", "Speakeasy Bartender", "Gravedigger", "Cultist Defector",
        "Cabaret Dancer", "Cryptographer", "Paranormal Investigator", "Antique Dealer",
        "Asylum Nurse", "Aviator", "Rum Runner", "Bellhop", "Stenographer",
        "Snake Oil Salesman", "Lighthouse Keeper", "Radio Technician", "Newspaper Editor",
        "Carnival Barker", "Chemistry Professor", "Bank Robber", "Train Conductor",
        "Seance Medium", "Union Organizer", "Jazz Club Owner", "WWI Veteran",
        "Bookstore Clerk", "Forensic Analyst", "Museum Curator", "Moonshine Chemist",
        "Bounty Hunter"
    ];
    exports.occupationItems = {
        "Private Investigator": ["Notebook", "Flashlight", "Cigarette Case", "Old Photograph"],
        "Jazz Musician": ["Whiskey Flask", "Deck of Cards", "Matchbook", "Opera Tickets"],
        "Bootlegger": ["Map", "Lockpick Set", "Tin of Mints", "Monogrammed Lighter"],
        "Occult Scholar": ["Pocket Bible", "Cracked Mirror", "Pressed Flower", "Notebook"],
        "Flapper": ["Perfume Vial", "Silk Scarf", "Opera Tickets", "Cufflinks"],
        "Newsboy": ["Train Schedule", "Coin Purse", "Notebook", "Reading Glasses"],
        "Factory Worker": ["Handkerchief", "Tin of Mints", "Rusty Key", "Deck of Cards"],
        "Con Artist": ["Calling Card", "Cigarette Case", "Monogrammed Lighter", "Cracked Mirror"],
        "Radio Host": ["Fountain Pen", "Library Card", "Notebook", "Train Schedule"],
        "Librarian": ["Reading Glasses", "Library Card", "Notebook", "Pressed Flower"],
        "Street Magician": ["Deck of Cards", "Matchbook", "Cracked Mirror", "Rusty Key"],
        "Speakeasy Bartender": ["Whiskey Flask", "Opera Tickets", "Cigarette Case", "Tin of Mints"],
        "Gravedigger": ["Rusty Key", "Cracked Mirror", "Old Photograph", "Handkerchief"],
        "Cultist Defector": ["Pocket Bible", "Cracked Mirror", "Empty Envelope", "Pressed Flower"],
        "Cabaret Dancer": ["Silk Scarf", "Perfume Vial", "Opera Tickets", "Cufflinks"],
        "Cryptographer": ["Notebook", "Fountain Pen", "Library Card", "Train Schedule"],
        "Paranormal Investigator": ["Flashlight", "Notebook", "Old Photograph", "Cracked Mirror"],
        "Antique Dealer": ["Engraved Compass", "Old Photograph", "Pocket Watch", "Reading Glasses"],
        "Asylum Nurse": ["Bandage Roll", "Handkerchief", "Notebook", "Perfume Vial"],
        "Aviator": ["Map", "Engraved Compass", "Train Schedule", "Cigarette Case"],
        "Rum Runner": ["Lockpick Set", "Map", "Whiskey Flask", "Tin of Mints"],
        "Bellhop": ["Coin Purse", "Train Schedule", "Calling Card", "Handkerchief"],
        "Stenographer": ["Notebook", "Fountain Pen", "Reading Glasses", "Library Card"],
        "Snake Oil Salesman": ["Tin of Mints", "Perfume Vial", "Calling Card", "Cracked Mirror"],
        "Lighthouse Keeper": ["Flashlight", "Old Photograph", "Rusty Key", "Notebook"],
        "Radio Technician": ["Notebook", "Library Card", "Train Schedule", "Fountain Pen"],
        "Newspaper Editor": ["Notebook", "Reading Glasses", "Library Card", "Cigarette Case"],
        "Carnival Barker": ["Deck of Cards", "Matchbook", "Calling Card", "Tin of Mints"],
        "Chemistry Professor": ["Notebook", "Fountain Pen", "Library Card", "Pressed Flower"],
        "Bank Robber": ["Lockpick Set", "Map", "Cigarette Case", "Rusty Key"],
        "Train Conductor": ["Pocket Watch", "Train Schedule", "Coin Purse", "Handkerchief"],
        "Seance Medium": ["Cracked Mirror", "Pressed Flower", "Old Photograph", "Perfume Vial"],
        "Union Organizer": ["Notebook", "Library Card", "Train Schedule", "Handkerchief"],
        "Jazz Club Owner": ["Opera Tickets", "Whiskey Flask", "Cufflinks", "Monogrammed Lighter"],
        "WWI Veteran": ["Old Photograph", "Pocket Watch", "Rusty Key", "Handkerchief"],
        "Bookstore Clerk": ["Library Card", "Notebook", "Reading Glasses", "Pressed Flower"],
        "Forensic Analyst": ["Notebook", "Flashlight", "Library Card", "Fountain Pen"],
        "Museum Curator": ["Engraved Compass", "Old Photograph", "Reading Glasses", "Pocket Watch"],
        "Moonshine Chemist": ["Whiskey Flask", "Tin of Mints", "Notebook", "Lockpick Set"],
        "Bounty Hunter": ["Map", "Flashlight", "Rusty Key", "Deck of Cards"]
    };
});
// data/weapons.ts
define("data/weapons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.combatItems = void 0;
    exports.combatItems = {
        // 🔫 Ranged Weapons
        "Revolver": { type: "ranged", damage: "1d6", uses: 6 },
        "Shotgun": { type: "ranged", damage: "2d6", uses: 2 },
        "Tommy Gun": { type: "ranged", damage: "4d4", uses: 3 },
        "Derringer": { type: "ranged", damage: "1d4 (2d4)", uses: 2 },
        "Hunting Rifle": { type: "ranged", damage: "2d6", uses: 1 },
        // 🪓 Melee Weapons
        "Switchblade": { type: "melee", damage: "1d4", uses: 20 },
        "Brass Knuckles": { type: "melee", damage: "1d4, 2 attacks", uses: 30 },
        "Trench Club": { type: "melee", damage: "1d6", uses: 25 },
        "Crowbar": { type: "melee", damage: "1d6", uses: 40 },
        "Whip": { type: "melee", damage: "1d4", uses: 25 },
        // 💣 Explosives
        "Molotov Cocktail": { type: "explosive", damage: "2d6", uses: 1 },
        "Smoke Bomb": { type: "explosive", damage: "0", uses: 1 },
        "Flashbang": { type: "explosive", damage: "0", uses: 1 },
        "Grenade": { type: "explosive", damage: "2d8", uses: 1 },
        "Improvised Explosive": { type: "explosive", damage: "2d6", uses: 1 },
        "Tear Gas Canister": { type: "explosive", damage: "1d4", uses: 1 },
        // 🏥 Medical Gear
        "First Aid Kit": { type: "medical", damage: "heal 1d6", uses: 3 },
        "Morphine Syringe": { type: "medical", damage: "heal 1d4", uses: 1 },
        "Bandage Roll": { type: "medical", damage: "heal 1d4", uses: 5 },
        "Cocaine": { type: "medical", damage: "sanity +1d4", uses: 1 },
        // 🛡 Tactical Gear
        "Gas Mask": { type: "tactical", damage: "nullify gas", uses: 10 },
        "Bulletproof Vest": { type: "tactical", damage: "reduce 1d6", uses: 20 },
        "Ammo Pouch": { type: "tactical", damage: "reload", uses: 10 },
        "Combat Boots": { type: "tactical", damage: "fire resistant", uses: 30 },
        "Signal Flare": { type: "tactical", damage: "alert", uses: 1 },
        "Riot Shield": { type: "tactical", damage: "block 1d6", uses: 15 },
        "Scroll of Ryn’thar Neth-Gorgu": { type: "tactical", damage: ":", uses: 1 }
    };
});
define("main", ["require", "exports", "data/names", "data/occupations", "data/weapons"], function (require, exports, names_1, occupations_1, weapons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const weaponNames = Object.keys(weapons_1.combatItems);
    const randomWeapon = weaponNames[Math.floor(Math.random() * weaponNames.length)];
    const weaponData = weapons_1.combatItems[randomWeapon];
    const occupation = occupations_1.occupations[Math.floor(Math.random() * occupations_1.occupations.length)];
    const items = occupations_1.occupationItems[occupation] || [];
    const selectedItems = getRandomSample(items, Math.floor(Math.random() * 3) + 2);
    function generateName() {
        const first = names_1.firstNames[Math.floor(Math.random() * names_1.firstNames.length)];
        const last = names_1.lastNames[Math.floor(Math.random() * names_1.lastNames.length)];
        return `${first} ${last}`;
    }
    function generateCharacter() {
        const name = generateName();
        const occupation = occupations_1.occupations[Math.floor(Math.random() * occupations_1.occupations.length)];
        const hp = Math.floor(Math.random() * 6) + 5;
        const weaponNames = Object.keys(weapons_1.combatItems);
        const weaponChance = Math.random() < 0.05;
        const weapons = weaponChance
            ? getRandomSample(weaponNames, 2)
            : [weaponNames[Math.floor(Math.random() * weaponNames.length)]];
        const weaponDetails = weapons.map(name => {
            const w = weapons_1.combatItems[name];
            return `${name} (${w.type}, ${w.damage}, uses: ${w.uses})`;
        });
        const support = getRandomSample(["Bandages", "Flashlight", "Map", "Notebook"], Math.floor(Math.random() * 4));
        const occupationItemsList = getRandomSample(occupations_1.occupationItems[occupation] || [], Math.floor(Math.random() * 3) + 2);
        return `
Name: ${name}
Occupation: ${occupation}
HP: ${hp}
Sanity: 10

Inventory:
- Weapons: ${weaponDetails.join('\n  - ')}
- Support: ${support.join(', ')}
- Occupation Items: ${occupationItemsList.join(', ')}
`;
    }
    function getRandomSample(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    document.addEventListener('DOMContentLoaded', () => {
        const output = document.getElementById('characterOutput');
        const button = document.getElementById('generateBtn');
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
            if (output)
                output.textContent = generateCharacter();
        });
    });
});
