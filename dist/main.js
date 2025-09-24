var _a, _b;
import { whispers, traits, fears } from './data/whispers.js';
import { ritualCorruption } from "./data/corrupt_sanity.js";
import { generateCharacterData, setCurrentHp, setCurrentSanity, currentHp, maxHp, currentSanity, maxSanity, itemSelect, rebuildItemDetails, supportNames, ritualTriggered, setRitualTriggered, buildCharacterText } from './data/character_generator.js';
import { useItem, reloadItem, getItemUses, populateAddItemDropdown, setupItemManagement } from './data/item_manager.js';
const whispersBtn = document.getElementById("whispersBtn");
const whisperText = document.getElementById("whisperText");
function updatePostItNotes() {
    const note1 = document.getElementById("traitNote1");
    const note2 = document.getElementById("traitNote2");
    if (currentSanity <= 0) {
        // Insanity mode: override with corrupted messages
        const killText = "Kill them all\nKill them all\nKill them all\nKill them all";
        const methods = ["immediately", "discreetly", "gruesomely", "ceremoniously", "without hesitation", "with precision"];
        const methodText = methods[Math.floor(Math.random() * methods.length)];
        if (note1) {
            note1.innerHTML = "";
            note1.classList.add("insane-note");
            typeWriterEffect(note1, killText, 40, true);
        }
        if (note2) {
            note2.innerHTML = "";
            note2.classList.add("insane-note");
            typeWriterEffect(note2, methodText, 40, true);
        }
        return; // skip normal trait/fear logic
    }
    // Normal mode
    const shuffledTraits = traits.sort(() => 0.5 - Math.random());
    const shuffledFears = fears.sort(() => 0.5 - Math.random());
    const traitCount = Math.floor(Math.random() * 3) + 2; // 2 to 4
    const fearCount = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const selectedTraits = shuffledTraits.slice(0, traitCount);
    const selectedFears = shuffledFears.slice(0, fearCount);
    const traitText = selectedTraits.join("\n");
    const fearText = selectedFears.join("\n");
    if (note1) {
        note1.innerHTML = "";
        note1.classList.remove("insane-note");
        typeWriterEffect(note1, traitText, 40, true);
    }
    if (note2) {
        note2.innerHTML = "";
        note2.classList.remove("insane-note");
        typeWriterEffect(note2, fearText, 40, true);
    }
}
export function renderCharacter(output, useTypewriter = true) {
    const isInsane = currentSanity <= 0;
    const character = buildCharacterText();
    const characterText = document.getElementById("characterText");
    if (!characterText)
        return;
    // Apply blood-red styling if insane
    if (isInsane) {
        characterText.style.color = "#8A0303"; // bloodred
        characterText.style.fontFamily = "'Creepster', cursive"; // optional horror font
    }
    else {
        characterText.classList.remove("heartbeat");
        characterText.style.color = "";
        characterText.style.textShadow = "";
        characterText.style.fontFamily = "";
    }
    if (useTypewriter) {
        characterText.textContent = "";
        typeWriterEffect(characterText, character, 25);
        setTimeout(() => {
            if (isInsane) {
                characterText.innerHTML = `<div class="ripple-container heartbeat"><pre>${character}</pre></div>`;
            }
        }, character.length * 35);
        updatePostItNotes();
    }
    else {
        if (isInsane) {
            characterText.innerHTML = `<div class="ripple-container heartbeat"><pre>${character}</pre></div>`;
        }
        else {
            characterText.textContent = character;
        }
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
        ritualCorruption(characterText, () => {
            characterText.classList.remove("ritual-mode");
            characterText.style.opacity = "1";
            renderCharacter(characterText, true);
        });
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
    // pulse button on press
    whispersBtn.classList.add("whispers-active");
    // Hide after 3 seconds, and stop pulsing
    setTimeout(() => {
        whisperText.style.opacity = "0";
        whispersBtn.classList.remove("whispers-active");
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
