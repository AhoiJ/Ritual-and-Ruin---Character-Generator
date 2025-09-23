import { whispers, sanityWhisper } from './data/whispers.js';
import { ritualCorruption } from "./data/corrupt_sanity.js";
import {
    generateCharacterData,
    setCurrentHp,
    setCurrentSanity,
    currentHp,
    maxHp,
    currentSanity,
    maxSanity,
    characterName,
    characterOccupation,
    characterStats,
    weaponDetails,
    supportDetails,
    occupationItemsList,
    getAsciiBanner,
    itemSelect,
    rebuildItemDetails,
    supportNames,
    itemUses,
    ritualTriggered,
    setRitualTriggered
} from './data/character_generator.js';

const whispersBtn = document.getElementById("whispersBtn");
const whisperText = document.getElementById("whisperText");


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
            setCurrentHp(currentHp - 1);
            renderCharacter(output, false); // Instant update
        }
    });

    hpPlus?.addEventListener('click', () => {
        if (output && currentHp < maxHp) {
            setCurrentHp(currentHp + 1);
            renderCharacter(output, false);
        }
    });

    sanityMinus?.addEventListener('click', () => {
        if (output && currentSanity > 0) {
            setCurrentSanity(currentSanity - 1);
            renderCharacter(output, false);
            if (currentSanity === 0 && !ritualTriggered) {
                setRitualTriggered(true);
                checkSanityWhisper(); // or ritualCorruption()
            }
        }
    });

    sanityPlus?.addEventListener('click', () => {
        if (output && currentSanity < maxSanity && currentSanity > 0) {
            setCurrentSanity(currentSanity + 1);
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