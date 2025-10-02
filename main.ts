import { whispers, traits, fears } from './data/whispers.js';
import { ritualCorruption } from "./data/corrupt_sanity.js";
import { combatItems, insanitySpells, WeaponType } from './data/weapons.js';
import {
    generateCharacterData,
    setCurrentHp,
    setCurrentSanity,
    currentHp,
    maxHp,
    currentSanity,
    maxSanity,
    itemSelect,
    rebuildItemDetails,
    supportNames,
    itemUses,
    ritualTriggered,
    setRitualTriggered,
    buildCharacterText,
    loadCharacterFromStorage,
    saveCharacterToStorage
} from './data/character_generator.js';

import {
    addItem,
    removeItem,
    useItem,
    reloadItem,
    getItemUses,
    populateAddItemDropdown,
    setupItemManagement
} from './data/item_manager.js';


const whispersBtn = document.getElementById("whispersBtn");
const whisperText = document.getElementById("whisperText");

function updatePostItNotes(): void {
    const note1 = document.getElementById("traitNote1");
    const note2 = document.getElementById("traitNote2");
    const killText = "Kill them all\nKill them all\nKill them all\nKill them all";
    const methods = ["immediately", "discreetly", "gruesomely", "ceremoniously", "without hesitation", "with precision"];
    const methodText = methods[Math.floor(Math.random() * methods.length)];

    if (currentSanity <= 0) {
        // Insanity mode: override with corrupted messages
        localStorage.setItem("postItNote1", killText);
        localStorage.setItem("postItNote2", methodText);

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
    const fearCount = Math.floor(Math.random() * 3) + 1;  // 1 to 3

    const selectedTraits = shuffledTraits.slice(0, traitCount);
    const selectedFears = shuffledFears.slice(0, fearCount);

    const traitText = selectedTraits.join("\n");
    const fearText = selectedFears.join("\n");

    localStorage.setItem("postItNote1", traitText);
    localStorage.setItem("postItNote2", fearText);

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

export function renderCharacter(output: HTMLElement, useTypewriter: boolean = true): void {
    const isInsane = currentSanity <= 0;

    if (isInsane) {
        // Find existing spell or choose a new one
        const spell = insanitySpells.find(spell => itemUses[spell.name]) ||
            insanitySpells[Math.floor(Math.random() * insanitySpells.length)];

        // Inject into combatItems if missing
        if (!combatItems[spell.name]) {
            combatItems[spell.name] = {
                type: spell.type as WeaponType,
                damage: spell.damage,
                uses: spell.uses
            };
        }

        // Inject into itemUses if missing
        if (!itemUses[spell.name]) {
            itemUses[spell.name] = { current: spell.uses, max: spell.uses };
        }
        // Inject into supportNames if missing
        if (!supportNames.includes(spell.name)) {
            supportNames.push(spell.name);
        }

        // Inject into dropdown if missing
        if (!Array.from(itemSelect.options).some(opt => opt.value === spell.name)) {
            const option = document.createElement("option");
            option.value = spell.name;
            option.textContent = `${spell.name} (${spell.uses}/${spell.uses})`;
            itemSelect.appendChild(option);
        }
    }

    rebuildItemDetails();
    const character = buildCharacterText();
    const characterText = document.getElementById("characterText");
    if (!characterText) return;

    // Apply blood-red styling if insane
    if (isInsane) {
        characterText.style.color = "#8A0303";
        characterText.style.fontFamily = "'Creepster', cursive";
    } else {
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
                triggerWhisper("A forbidden spell claws its way into your mind...");
            }
        }, character.length * 35);
        updatePostItNotes();
    } else {
        if (isInsane) {
            characterText.innerHTML = `<div class="ripple-container heartbeat"><pre>${character}</pre></div>`;
        } else {
            characterText.textContent = character;
        }
    }

    saveCharacterToStorage();
}

export function typeWriterEffect(element: HTMLElement, text: string, speed: number = 30, append: boolean = false): void {
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

    // pulse button on press
    whispersBtn.classList.add("whispers-active");
    // Hide after 3 seconds, and stop pulsing
    setTimeout(() => {
        whisperText.style.opacity = "0";
        whispersBtn.classList.remove("whispers-active");
    }, 3000);
});

function refreshCharacter(): void {
    rebuildItemDetails();
    const output = document.getElementById("characterOutput");
    if (output) renderCharacter(output, false);
}

document.getElementById("useBtn")?.addEventListener("click", () => {
    const selected = itemSelect.value;
    if (useItem(selected)) {
        updateDropdownLabel(selected);
        refreshCharacter();
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

document.getElementById("reloadBtn")?.addEventListener("click", () => {
    const selected = itemSelect.value;
    const hasPouch = supportNames.includes("Ammo Pouch");
    reloadItem(selected, hasPouch);
    triggerWhisper("The weapon feels reliable... for now");
    updateDropdownLabel(selected);
    refreshCharacter();
});

function updateDropdownLabel(name: string): void {
    const options = itemSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === name) {
            options[i].textContent = `${name} (${getItemUses(name)})`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('characterOutput')!;
    const addItemSelect = document.getElementById('addItemSelect') as HTMLSelectElement;
    const addItemBtn = document.getElementById('addItemBtn')!;
    const removeItemBtn = document.getElementById('removeItemBtn')!;

    populateAddItemDropdown(addItemSelect);
    setupItemManagement(addItemBtn, removeItemBtn, addItemSelect, output);
});

window.addEventListener("DOMContentLoaded", () => {
    const loaded = loadCharacterFromStorage();
    if (loaded) {
        renderCharacter(document.getElementById("characterOutput")!, false);
    }
});