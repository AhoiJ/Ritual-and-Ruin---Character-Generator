// data/weapons.ts
export const combatItems = {
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
