var _a, _b;
import { whispers } from './data/whispers.js';
import { ritualCorruption } from "./data/corrupt_sanity.js";
import { generateCharacterData, setCurrentHp, setCurrentSanity, currentHp, maxHp, currentSanity, maxSanity, characterName, characterOccupation, characterStats, weaponDetails, supportDetails, occupationItemsList, getAsciiBanner, itemSelect, rebuildItemDetails, supportNames, ritualTriggered, setRitualTriggered } from './data/character_generator.js';
import { useItem, reloadItem, getItemUses, populateAddItemDropdown, setupItemManagement } from './data/item_manager.js';
const whispersBtn = document.getElementById("whispersBtn");
const whisperText = document.getElementById("whisperText");
export function renderCharacter(output, useTypewriter = true) {
    const asciiArt = getAsciiBanner(characterOccupation);
    // 🧠 Build stats block
    let statsBlock = "";
    Object.entries(characterStats).forEach(([stat, value]) => {
        statsBlock += `${stat}: ${value}\n`;
    });
    const cleanedSupportDetails = supportDetails.map(line => {
        const match = line.match(/^(.+?) \(([^,]+), (.+)\)$/);
        if (!match)
            return line; // fallback if format doesn't match
        const name = match[1]; // "First Aid Kit"
        const effect = match[3]; // "heal 1d6, uses: 3"
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
    if (!characterText)
        return;
    if (useTypewriter) {
        characterText.textContent = "";
        typeWriterEffect(characterText, character, 25);
    }
    else {
        characterText.textContent = character;
    }
}
function typeWriterEffect(element, text, speed = 30, append = false) {
    if (!append)
        element.textContent = "";
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
function checkSanityWhisper() {
    const characterText = document.getElementById("characterText");
    if (!characterText)
        return;
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
    button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
        if (output) {
            generateCharacterData();
            renderCharacter(output, true); // Use typewriter
        }
    });
    hpMinus === null || hpMinus === void 0 ? void 0 : hpMinus.addEventListener('click', () => {
        if (output && currentHp > 0) {
            setCurrentHp(currentHp - 1);
            renderCharacter(output, false); // Instant update
        }
    });
    hpPlus === null || hpPlus === void 0 ? void 0 : hpPlus.addEventListener('click', () => {
        if (output && currentHp < maxHp) {
            setCurrentHp(currentHp + 1);
            renderCharacter(output, false);
        }
    });
    sanityMinus === null || sanityMinus === void 0 ? void 0 : sanityMinus.addEventListener('click', () => {
        if (output && currentSanity > 0) {
            setCurrentSanity(currentSanity - 1);
            renderCharacter(output, false);
            if (currentSanity === 0 && !ritualTriggered) {
                setRitualTriggered(true);
                checkSanityWhisper(); // or ritualCorruption()
            }
        }
    });
    sanityPlus === null || sanityPlus === void 0 ? void 0 : sanityPlus.addEventListener('click', () => {
        if (output && currentSanity < maxSanity && currentSanity > 0) {
            setCurrentSanity(currentSanity + 1);
            renderCharacter(output, false);
        }
    });
});
whispersBtn === null || whispersBtn === void 0 ? void 0 : whispersBtn.addEventListener("click", () => {
    if (!whisperText)
        return;
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
function refreshCharacter() {
    rebuildItemDetails();
    const output = document.getElementById("characterOutput");
    if (output)
        renderCharacter(output, false);
}
(_a = document.getElementById("useBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const selected = itemSelect.value;
    if (useItem(selected)) {
        updateDropdownLabel(selected);
        refreshCharacter();
    }
});
function triggerWhisper(message) {
    const whisperText = document.getElementById("whisperText");
    if (!whisperText)
        return;
    const whisper = message || whispers[Math.floor(Math.random() * whispers.length)];
    whisperText.textContent = whisper;
    whisperText.style.opacity = "1";
    setTimeout(() => {
        whisperText.style.opacity = "0";
    }, 3000);
}
(_b = document.getElementById("reloadBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const selected = itemSelect.value;
    const hasPouch = supportNames.includes("Ammo Pouch");
    reloadItem(selected, hasPouch);
    triggerWhisper("The weapon feels reliable... for now");
    updateDropdownLabel(selected);
    refreshCharacter();
});
function updateDropdownLabel(name) {
    const options = itemSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === name) {
            options[i].textContent = `${name} (${getItemUses(name)})`;
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('characterOutput');
    const addItemSelect = document.getElementById('addItemSelect');
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');
    populateAddItemDropdown(addItemSelect);
    setupItemManagement(addItemBtn, removeItemBtn, addItemSelect, output);
});
