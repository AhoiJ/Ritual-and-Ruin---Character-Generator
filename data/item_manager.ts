// /data/item_manager.ts
import { combatItems } from './weapons.js';
import {
    itemUses,
    itemSelect,
    rebuildItemDetails,
    supportNames
} from './character_generator.js';
import { renderCharacter } from '../main.js';

export function addItem(name: string, maxUses: number): void {
    itemUses[name] = { current: maxUses, max: maxUses };
}

export function removeItem(name: string): void {
    delete itemUses[name];
}

export function useItem(name: string): boolean {
    const item = itemUses[name];
    if (!item || item.current <= 0) return false;
    item.current--;
    return true;
}

export function reloadItem(name: string, hasAmmoPouch: boolean): void {
    const item = itemUses[name];
    if (!item) return;

    const refill = hasAmmoPouch ? item.max : Math.max(1, Math.floor(item.max / 3));
    item.current = Math.min(item.current + refill, item.max);
}

export function getItemUses(name: string): string {
    const item = itemUses[name];
    return item ? `${item.current}/${item.max}` : "0/0";
}

export function populateAddItemDropdown(dropdown: HTMLSelectElement): void {
    dropdown.innerHTML = "";
    Object.keys(combatItems).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    });
}

export function setupItemManagement(addBtn: HTMLElement, removeBtn: HTMLElement, dropdown: HTMLSelectElement, output: HTMLElement): void {
    addBtn.addEventListener("click", () => {
        const selected = dropdown.value;
        const item = combatItems[selected];
        if (!item) return;

        // Prevent duplicates
        if (itemUses[selected]) return;

        addItem(selected, item.uses);

        // Add to supportNames if it's a support item
        if (["explosive", "medical", "tactical"].includes(item.type)) {
            if (!supportNames.includes(selected)) {
                supportNames.push(selected);
            }
        }

        const option = document.createElement("option");
        option.value = selected;
        option.textContent = `${selected} (${getItemUses(selected)})`;
        itemSelect.appendChild(option);

        rebuildItemDetails();
        renderCharacter(output, false);
    });

    removeBtn.addEventListener("click", () => {
        const selected = itemSelect.value;
        // Remove from itemUses
        removeItem(selected);
        // Remove from dropdown
        itemSelect.querySelector(`option[value="${selected}"]`)?.remove();
        // Remove from supportNames if present
        const index = supportNames.indexOf(selected);
        if (index !== -1) {
            supportNames.splice(index, 1);
        }

        rebuildItemDetails();
        renderCharacter(output, false);
    });
}