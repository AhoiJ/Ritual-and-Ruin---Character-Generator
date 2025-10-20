import { firstNames, lastNames } from './names.js';
import { occupations, occupationItems, asciiBanners } from './occupations.js';
import { combatItems, WeaponType, insanitySpells } from './weapons.js';
import { typeWriterEffect } from '../main.js';

export const itemSelect = document.getElementById("itemSelect") as HTMLSelectElement;


export const stats: Record<string, number> = {
    hp: 0,
    sanity: 0,
    luck: 0,
};
export let maxHp = 0;
export let maxSanity = 0;
export let maxLuck = 0;
export let ritualTriggered = false;
export let supportNames: string[] = [];
export let itemUses: Record<string, { current: number; max: number }> = {};
export let characterStats: {
    Strength: number;
    Dexterity: number;
    Perception: number;
    Knowledge: number;
    Movement: number;
};
export let characterName = "";
export let characterOccupation = "";
export let weaponDetails: string[] = [];
export let supportDetails: string[] = [];
export let occupationItemsList: string[] = [];


function getRandomSample<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
function formatItemLine(name: string, type: string, damage: string, uses: number): string {
    const details = type === "melee"
        ? `(${type}, ${damage})`
        : `(${type}, ${damage}, uses: ${uses})`;

    return `${name} ${details}`;
}

const meleeWeapons = Object.entries(combatItems)
    .filter(([_, data]) => data.type === "melee")
    .map(([name]) => name);

const rangedWeapons = Object.entries(combatItems)
    .filter(([_, data]) => data.type === "ranged")
    .map(([name]) => name);

const weaponPool = [...meleeWeapons, ...rangedWeapons];

const supportItems = Object.entries(combatItems)
    .filter(([_, data]) =>
        ["explosive", "medical", "tactical"].includes(data.type)
    )
    .map(([name]) => name);

function generateName(): string {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
}

function generateStat(min = 25, max = 85, step = 5): number {
    const range = Math.floor((max - min) / step) + 1;
    const value = Math.floor(Math.random() * range);
    return min + value * step;
}

export function generateCharacterData(): void {

    const characterText = document.getElementById("characterText");
    if (characterText) {
        characterText.style.opacity = "1";
        characterText.classList.remove("corrupted");
    }

    ritualTriggered = false;
    itemUses = {};
    maxHp = Math.floor(Math.random() * 9) + 7;
    stats.hp = maxHp;
    maxSanity = Math.floor(Math.random() * 6) + 5;
    stats.sanity = maxSanity;
    maxLuck = 20;
    stats.luck = maxLuck;
    characterName = generateName();
    characterOccupation = occupations[Math.floor(Math.random() * occupations.length)];

    characterStats = {
        Strength: generateStat(),
        Dexterity: generateStat(),
        Perception: generateStat(),
        Knowledge: generateStat(),
        Movement: Math.floor(Math.random() * 5) + 4
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

    occupationItemsList = getRandomSample(
        occupationItems[characterOccupation] || [],
        Math.floor(Math.random() * 3) + 2
    );

    itemSelect.innerHTML = ""; // clear previous

    Object.keys(itemUses).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = `${name} (${itemUses[name].current}/${itemUses[name].max})`;
        itemSelect.appendChild(option);
    });
}

export function getAsciiBanner(occupation: string): string {
    for (const key in asciiBanners) {
        if (occupation.toLowerCase().includes(key.toLowerCase())) {
            return asciiBanners[key];
        }
    }
    return asciiBanners["Default"];
}

export function rebuildItemDetails(): void {
    weaponDetails = Object.keys(itemUses)
        .filter(name => {
            const item = combatItems[name];
            return item && (item.type === "melee" || item.type === "ranged");
        })
        .map(name => {
            const item = combatItems[name];
            return item
                ? formatItemLine(name, item.type, item.damage, itemUses[name].current)
                : `${name} (missing item definition)`;
        });

    supportDetails = supportNames
        .filter(name => combatItems[name])
        .map(name => {
            const item = combatItems[name];
            return formatItemLine(name, item.type, item.damage, itemUses[name].current);
        });
    console.log("Support Details:", supportDetails);

}

export function setStat(statName: keyof typeof stats, value: number): void {
    stats[statName] = value;
}
export function setRitualTriggered(value: boolean): void {
    ritualTriggered = value;
}

function toFullWidth(text: string): string {
    return [...text].map(char => {
        const code = char.charCodeAt(0);
        return (code >= 33 && code <= 126) ? String.fromCharCode(code + 0xFF00 - 0x20) : char;
    }).join('');
}

export function buildCharacterText(): string {
    const isInsane = stats.sanity <= 0;
    const asciiArt = isInsane
        ? toFullWidth("THRALL OF THE ELDER ONE")
        : getAsciiBanner(characterOccupation);

    let statsBlock = "";
    const statLabelWidth = 11; // longest stat name is "Perception"
    Object.entries(characterStats).forEach(([stat, value]) => {
        const base = `${stat.padEnd(statLabelWidth)} ${value.toString().padEnd(3)}`;
        const extra = stat !== "Movement" ? ` [${Math.floor(value / 2)} / ${Math.floor(value / 5)}]` : "";
        statsBlock += `${base}${extra}\n`;
    });

    const labelWidth = 11; // longest label: "Occupation"
    const infoBlock =
        `${"Name:".padEnd(labelWidth)} ${characterName}\n` +
        `${"Occupation:".padEnd(labelWidth)} ${characterOccupation}\n` +
        `${"HP:".padEnd(labelWidth)} ${stats.hp}/${maxHp}\n` +
        `${"Sanity:".padEnd(labelWidth)} ${stats.sanity}/${maxSanity}\n` +
        `${"Luck:".padEnd(labelWidth)} ${stats.luck}/${maxLuck}\n`;

    const cleanedSupportDetails = supportDetails.map(line => {
        const match = line.match(/^(.+?) \(([^,]+), (.+)\)$/);
        if (!match) return line;
        const name = match[1];
        const effect = match[3];
        return `${name}: ${effect}`;
    });

    return `
${asciiArt}

${infoBlock}
${statsBlock}
Inventory:
- Weapons: ${weaponDetails.join('\n  - ')}
- Support: 
  - ${cleanedSupportDetails.join('\n  - ')}
- Occupation Items: 
  - ${occupationItemsList.join('\n  - ')}
`;
}


export function saveCharacterToStorage(): void {
    const corruptedSpellName = insanitySpells.find(spell => itemUses[spell.name])?.name || null;
    const corruptedSpell = corruptedSpellName
        ? insanitySpells.find(spell => spell.name === corruptedSpellName)
        : null;

    const data = {
        name: characterName,
        occupation: characterOccupation,
        stats: characterStats,
        hp: { current: stats.hp, max: maxHp },
        sanity: { current: stats.sanity, max: maxSanity },
        luck: { current: stats.luck, max: maxLuck },
        items: itemUses,
        support: supportNames,
        occupationItems: occupationItemsList,
        corruptedSpell: corruptedSpell
    };

    localStorage.setItem("characterData", JSON.stringify(data));
}

export function loadCharacterFromStorage(): boolean {
    const saved = localStorage.getItem("characterData");
    if (!saved) return false;

    try {
        const data = JSON.parse(saved);

        // Restore core character data
        characterName = data.name;
        characterOccupation = data.occupation;
        characterStats = data.stats;
        stats.hp = data.hp.current;
        maxHp = data.hp.max;
        stats.sanity = data.sanity.current;
        maxSanity = data.sanity.max;
        stats.luck = data.luck.current;
        maxLuck = data.luck.max;
        itemUses = data.items;
        supportNames = data.support;
        occupationItemsList = data.occupationItems;

        // Restore corrupted spell if present
        const corruptedSpellName = data.corruptedSpell;
        if (corruptedSpellName && !itemUses[corruptedSpellName]) {
            const spell = insanitySpells.find(s => s.name === corruptedSpellName);
            if (spell) {
                combatItems[spell.name] = {
                    type: spell.type as WeaponType,
                    damage: spell.damage,
                    uses: spell.uses
                };
                itemUses[spell.name] = { current: spell.uses, max: spell.uses };
                supportNames.push(spell.name);
            }
        }

        // Rebuild item dropdown
        itemSelect.innerHTML = "";
        Object.keys(itemUses).forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = `${name} (${itemUses[name].current}/${itemUses[name].max})`;
            itemSelect.appendChild(option);
        });

        // Rebuild item details
        rebuildItemDetails();

        // Restore post-it notes
        const note1 = document.getElementById("traitNote1");
        const note2 = document.getElementById("traitNote2");
        const savedNote1 = localStorage.getItem("postItNote1");
        const savedNote2 = localStorage.getItem("postItNote2");

        if (note1 && savedNote1) {
            note1.innerHTML = "";
            note1.classList.toggle("insane-note", stats.sanity <= 0);
            typeWriterEffect(note1, savedNote1, 40, false);
        }

        if (note2 && savedNote2) {
            note2.innerHTML = "";
            note2.classList.toggle("insane-note", stats.sanity <= 0);
            typeWriterEffect(note2, savedNote2, 40, false);
        }

        return true;
    } catch (err) {
        console.error("Failed to load character:", err);
        return false;
    }
}