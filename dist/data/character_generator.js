import { firstNames, lastNames } from './names.js';
import { occupations, occupationItems, asciiBanners } from './occupations.js';
import { combatItems } from './weapons.js';
export const itemSelect = document.getElementById("itemSelect");
export let currentHp = 0;
export let maxHp = 0;
export let currentSanity = 0;
export let maxSanity = 0;
export let ritualTriggered = false;
export let supportNames = [];
export let itemUses = {};
export let characterStats;
export let characterName = "";
export let characterOccupation = "";
export let weaponDetails = [];
export let supportDetails = [];
export let occupationItemsList = [];
function getRandomSample(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
function formatItemLine(name, type, damage, uses, maxLength = 25) {
    const details = `(${type}, ${damage}, uses: ${uses})`;
    return name.length > maxLength
        ? `${name}\n  ${details}`
        : `${name} ${details}`;
}
const meleeWeapons = Object.entries(combatItems)
    .filter(([_, data]) => data.type === "melee")
    .map(([name]) => name);
const rangedWeapons = Object.entries(combatItems)
    .filter(([_, data]) => data.type === "ranged")
    .map(([name]) => name);
const weaponPool = [...meleeWeapons, ...rangedWeapons];
const supportItems = Object.entries(combatItems)
    .filter(([_, data]) => ["explosive", "medical", "tactical"].includes(data.type))
    .map(([name]) => name);
function generateName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
}
function generateStat(min = 25, max = 85, step = 5) {
    const range = Math.floor((max - min) / step) + 1;
    const value = Math.floor(Math.random() * range);
    return min + value * step;
}
export function generateCharacterData() {
    const characterText = document.getElementById("characterText");
    if (characterText) {
        characterText.style.opacity = "1";
        characterText.classList.remove("corrupted");
    }
    ritualTriggered = false;
    itemUses = {};
    maxHp = Math.floor(Math.random() * 9) + 7;
    currentHp = maxHp;
    maxSanity = Math.floor(Math.random() * 6) + 5;
    currentSanity = maxSanity;
    characterName = generateName();
    characterOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    characterStats = {
        Strength: generateStat(),
        Dexterity: generateStat(),
        Perception: generateStat(),
        Knowledge: generateStat()
    };
    const weaponChance = Math.random() < 0.05;
    const weapons = weaponChance
        ? getRandomSample(weaponPool, 1)
        : [weaponPool[Math.floor(Math.random() * weaponPool.length)]];
    weaponDetails = weapons.map(name => {
        const w = combatItems[name];
        itemUses[name] = { current: w.uses, max: w.uses };
        return formatItemLine(name, w.type, w.damage, w.uses);
    });
    supportNames = getRandomSample(supportItems, Math.floor(Math.random() * 4));
    supportDetails = supportNames.map(name => {
        const item = combatItems[name];
        if (item.uses) {
            itemUses[name] = { current: item.uses, max: item.uses };
        }
        return formatItemLine(name, item.type, item.damage, item.uses);
    });
    occupationItemsList = getRandomSample(occupationItems[characterOccupation] || [], Math.floor(Math.random() * 3) + 2);
    itemSelect.innerHTML = ""; // clear previous
    Object.keys(itemUses).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = `${name} (${itemUses[name].current}/${itemUses[name].max})`;
        itemSelect.appendChild(option);
    });
}
export function getAsciiBanner(occupation) {
    for (const key in asciiBanners) {
        if (occupation.toLowerCase().includes(key.toLowerCase())) {
            return asciiBanners[key];
        }
    }
    return asciiBanners["Default"];
}
export function rebuildItemDetails() {
    weaponDetails = Object.keys(itemUses)
        .filter(name => combatItems[name].type === "melee" || combatItems[name].type === "ranged")
        .map(name => {
        const item = combatItems[name];
        return formatItemLine(name, item.type, item.damage, itemUses[name].current);
    });
    supportDetails = supportNames.map(name => {
        const item = combatItems[name];
        return formatItemLine(name, item.type, item.damage, itemUses[name].current);
    });
}
export function setCurrentHp(value) {
    currentHp = value;
}
export function setCurrentSanity(value) {
    currentSanity = value;
}
export function setRitualTriggered(value) {
    ritualTriggered = value;
}
