import { firstNames, lastNames } from './data/names.js';
import { occupations, occupationItems, asciiBanners } from './data/occupations.js';
import { combatItems } from './data/weapons.js';
import { whispers, sanityWhisper } from './data/whispers.js';
import { ritualCorruption } from "./data/corrupt_sanity.js";

const whispersBtn = document.getElementById("whispersBtn");
const whisperText = document.getElementById("whisperText");
const itemSelect = document.getElementById("itemSelect") as HTMLSelectElement;

let currentHp = 0;
let maxHp = 0;
let currentSanity = 0;
let maxSanity = 0;
let ritualTriggered = false;
let supportNames: string[] = [];
let itemUses: Record<string, { current: number; max: number }> = {};
let characterStats: {
    Strength: number;
    Dexterity: number;
    Perception: number;
    Knowledge: number;
};
let characterName = "";
let characterOccupation = "";
let weaponDetails: string[] = [];
let supportDetails: string[] = [];
let occupationItemsList: string[] = [];

function formatItemLine(name: string, type: string, damage: string, uses: number, maxLength = 25): string {
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

function generateCharacterData(): void {

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

function getAsciiBanner(occupation: string): string {
    for (const key in asciiBanners) {
        if (occupation.toLowerCase().includes(key.toLowerCase())) {
            return asciiBanners[key];
        }
    }
    return asciiBanners["Default"];
}

function renderCharacter(output: HTMLElement, useTypewriter: boolean = true): void {
    const asciiArt = getAsciiBanner(characterOccupation);

    // 🧠 Build stats block
    let statsBlock = "";
    Object.entries(characterStats).forEach(([stat, value]) => {
        statsBlock += `${stat}: ${value}\n`;
    });

    const cleanedSupportDetails = supportDetails.map(line => {
        const match = line.match(/^(.+?) \(([^,]+), (.+)\)$/);
        if (!match) return line; // fallback if format doesn't match

        const name = match[1];         // "First Aid Kit"
        const effect = match[3];       // "heal 1d6, uses: 3"
        return `${name}: ${effect}`;
    });

    // 🧾 Build full character sheet
    const character = `
${asciiArt}

Name: ${characterName}
Occupation: ${characterOccupation}
HP: ${currentHp}/${maxHp}
Sanity: ${currentSanity}/${maxSanity}

${statsBlock}
Inventory:
- Weapons: ${weaponDetails.join('\n  - ')}
- Support: 
  - ${cleanedSupportDetails.join('\n  - ')}
- Occupation Items: 
  - ${occupationItemsList.join('\n  - ')}
`;

    const characterText = document.getElementById("characterText");
    if (!characterText) return;

    if (useTypewriter) {
        characterText.textContent = "";
        typeWriterEffect(characterText, character, 25);
    } else {
        characterText.textContent = character;
    }
}

function getRandomSample<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function typeWriterEffect(element: HTMLElement, text: string, speed: number = 30, append: boolean = false): void {
    if (!append) element.textContent = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function checkSanityWhisper(): void {
    const characterText = document.getElementById("characterText");
    if (!characterText) return;

    if (currentSanity === 0) {
        ritualCorruption(characterText);
    }
}

function rebuildItemDetails(): void {
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

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('characterOutput');
    const button = document.getElementById('generateBtn');

    const hpMinus = document.getElementById('hpMinus');
    const hpPlus = document.getElementById('hpPlus');
    const sanityMinus = document.getElementById('sanityMinus');
    const sanityPlus = document.getElementById('sanityPlus');

    button?.addEventListener('click', () => {
        if (output) {
            generateCharacterData();
            renderCharacter(output, true); // Use typewriter
        }
    });

    hpMinus?.addEventListener('click', () => {
        if (output && currentHp > 0) {
            currentHp--;
            renderCharacter(output, false); // Instant update
        }
    });

    hpPlus?.addEventListener('click', () => {
        if (output && currentHp < maxHp) {
            currentHp++;
            renderCharacter(output, false);
        }
    });

    sanityMinus?.addEventListener('click', () => {
        if (output && currentSanity > 0) {
            currentSanity--;
            renderCharacter(output, false);
            if (currentSanity === 0 && !ritualTriggered) {
                ritualTriggered = true;
                checkSanityWhisper(); // or ritualCorruption()
            }
        }
    });

    sanityPlus?.addEventListener('click', () => {
        if (output && currentSanity < maxSanity && currentSanity > 0) {
            currentSanity++;
            renderCharacter(output, false);
        }
    });
});

whispersBtn?.addEventListener("click", () => {
    if (!whisperText) return;

    // Pick a random whisper
    const whisper = whispers[Math.floor(Math.random() * whispers.length)];

    // Show it
    whisperText.textContent = whisper;
    whisperText.style.opacity = "1";

    // Hide after 3 seconds
    setTimeout(() => {
        whisperText.style.opacity = "0";
    }, 3000);
});

document.getElementById("useBtn")?.addEventListener("click", () => {
    const selected = itemSelect.value;
    if (itemUses[selected]?.current > 0) {
        itemUses[selected].current--;
        updateDropdownLabel(selected);
        rebuildItemDetails();
        const output = document.getElementById("characterOutput");
        if (output) renderCharacter(output, false);
    }
});

function triggerWhisper(message?: string): void {
    const whisperText = document.getElementById("whisperText");
    if (!whisperText) return;

    const whisper = message || whispers[Math.floor(Math.random() * whispers.length)];
    whisperText.textContent = whisper;
    whisperText.style.opacity = "1";

    setTimeout(() => {
        whisperText.style.opacity = "0";
    }, 3000);
}

function hasAmmoPouch(): boolean {
    return supportNames.includes("Ammo Pouch");
}

document.getElementById("reloadBtn")?.addEventListener("click", () => {
    const selected = itemSelect.value;
    const item = itemUses[selected];
    if (!item) return;

    if (item.current < item.max) {
        const refill = hasAmmoPouch()
            ? item.max
            : Math.max(1, Math.floor(item.max / 3));

        item.current = Math.min(item.current + refill, item.max);
        updateDropdownLabel(selected);
        rebuildItemDetails();
        const output = document.getElementById("characterOutput");
        if (output) renderCharacter(output, false);
        triggerWhisper("The weapon feels reliable... for now");
    }
});

function updateDropdownLabel(name: string) {
    const options = itemSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === name) {
            options[i].textContent = `${name} (${itemUses[name].current}/${itemUses[name].max})`;
        }
    }
}