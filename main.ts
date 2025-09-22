import { firstNames, lastNames } from './data/names.js';
import { occupations, occupationItems } from './data/occupations.js';
import { combatItems } from './data/weapons.js';

let currentHp = 0;
let maxHp = 0;
let currentSanity = 0;
const maxSanity = 10;

let characterName = "";
let characterOccupation = "";
let weaponDetails: string[] = [];
let supportDetails: string[] = [];
let occupationItemsList: string[] = [];

const asciiBanners: Record<string, string> = {
  "Private Investigator": `╔════════════════════════════════════════╗
║  Case File – Confidential Dossier      ║
╚════════════════════════════════════════╝`,

  "Jazz Musician": `╔════════════════════════════════════════╗
║  Jazz Circuit – Performer Roster       ║
╚════════════════════════════════════════╝`,

  "Bootlegger": `╔════════════════════════════════════════╗
║  Prohibition Watchlist – Suspect ID    ║
╚════════════════════════════════════════╝`,

  "Occult Scholar": `╔════════════════════════════════════════╗
║  Miskatonic Archives – Scholar File    ║
╚════════════════════════════════════════╝`,

  "Flapper": `╔════════════════════════════════════════╗
║  Socialite Registry – Party Circuit    ║
╚════════════════════════════════════════╝`,

  "Newsboy": `╔════════════════════════════════════════╗
║  Press Ledger – Distribution File      ║
╚════════════════════════════════════════╝`,

  "Factory Worker": `╔════════════════════════════════════════╗
║  Labor Registry – Worker File          ║
╚════════════════════════════════════════╝`,

  "Con Artist": `╔════════════════════════════════════════╗
║  Confidence File – Known Alias         ║
╚════════════════════════════════════════╝`,

  "Radio Host": `╔════════════════════════════════════════╗
║  Broadcast Registry – Host Profile     ║
╚════════════════════════════════════════╝`,

  "Librarian": `╔════════════════════════════════════════╗
║  Library Index – Staff Credentials     ║
╚════════════════════════════════════════╝`,

  "Street Magician": `╔════════════════════════════════════════╗
║  Illusion Registry – Performer File    ║
╚════════════════════════════════════════╝`,

  "Speakeasy Bartender": `╔════════════════════════════════════════╗
║  Speakeasy Log – Staff Credentials     ║
╚════════════════════════════════════════╝`,

  "Gravedigger": `╔════════════════════════════════════════╗
║  Cemetery Ledger – Gravekeeper File    ║
╚════════════════════════════════════════╝`,

  "Cultist Defector": `╔════════════════════════════════════════╗
║  Cult Watch – Defector Testimony       ║
╚════════════════════════════════════════╝`,

  "Cabaret Dancer": `╔════════════════════════════════════════╗
║  Cabaret Ledger – Performer Profile    ║
╚════════════════════════════════════════╝`,

  "Cryptographer": `╔════════════════════════════════════════╗
║  Cipher Bureau – Encrypted Profile     ║
╚════════════════════════════════════════╝`,

  "Paranormal Investigator": `╔════════════════════════════════════════╗
║  Bureau of Anomalies – Field Report    ║
╚════════════════════════════════════════╝`,

  "Antique Dealer": `╔════════════════════════════════════════╗
║  Trade Ledger – Dealer Inventory       ║
╚════════════════════════════════════════╝`,

  "Asylum Nurse": `╔════════════════════════════════════════╗
║  Arkham Asylum – Staff Credentials     ║
╚════════════════════════════════════════╝`,

  "Aviator": `╔════════════════════════════════════════╗
║  Flight Log – Pilot Credentials        ║
╚════════════════════════════════════════╝`,

  "Rum Runner": `╔════════════════════════════════════════╗
║  Smuggler Manifest – Cargo Record      ║
╚════════════════════════════════════════╝`,

  "Bellhop": `╔════════════════════════════════════════╗
║  Hotel Staff – Service Record          ║
╚════════════════════════════════════════╝`,

  "Stenographer": `╔════════════════════════════════════════╗
║  Transcript Bureau – Typist File       ║
╚════════════════════════════════════════╝`,

  "Snake Oil Salesman": `╔════════════════════════════════════════╗
║  Traveling Tonic – Sales Ledger        ║
╚════════════════════════════════════════╝`,

  "Lighthouse Keeper": `╔════════════════════════════════════════╗
║  Coastal Registry – Keeper Log         ║
╚════════════════════════════════════════╝`,

  "Radio Technician": `╔════════════════════════════════════════╗
║  Signal Division – Technician Log      ║
╚════════════════════════════════════════╝`,

  "Newspaper Editor": `╔════════════════════════════════════════╗
║  Editorial Office – Staff Record       ║
╚════════════════════════════════════════╝`,

  "Carnival Barker": `╔════════════════════════════════════════╗
║  Carnival Ledger – Showman Profile     ║
╚════════════════════════════════════════╝`,

  "Chemistry Professor": `╔════════════════════════════════════════╗
║  Faculty Record – Science Division     ║
╚════════════════════════════════════════╝`,

  "Bank Robber": `╔════════════════════════════════════════╗
║  Federal Offense – Wanted Profile      ║
╚════════════════════════════════════════╝`,

  "Train Conductor": `╔════════════════════════════════════════╗
║  Rail Manifest – Crew Credentials      ║
╚════════════════════════════════════════╝`,

  "Seance Medium": `╔════════════════════════════════════════╗
║  Spirit Channel – Session Transcript   ║
╚════════════════════════════════════════╝`,

  "Union Organizer": `╔════════════════════════════════════════╗
║  Union Archive – Organizer Record      ║
╚════════════════════════════════════════╝`,

  "Jazz Club Owner": `╔════════════════════════════════════════╗
║  Venue Record – Proprietor File        ║
╚════════════════════════════════════════╝`,

  "WWI Veteran": `╔════════════════════════════════════════╗
║  Military Archive – Veteran Record     ║
╚════════════════════════════════════════╝`,

  "Bookstore Clerk": `╔════════════════════════════════════════╗
║  Inventory Ledger – Bookstore Staff    ║
╚════════════════════════════════════════╝`,

  "Forensic Analyst": `╔════════════════════════════════════════╗
║  Evidence Log – Forensic Division      ║
╚════════════════════════════════════════╝`,

  "Museum Curator": `╔════════════════════════════════════════╗
║  Antiquities Registry – Curator Log    ║
╚════════════════════════════════════════╝`,

  "Moonshine Chemist": `╔════════════════════════════════════════╗
║  Illicit Lab – Formula Registry        ║
╚════════════════════════════════════════╝`,

  "Bounty Hunter": `╔════════════════════════════════════════╗
║  Target File – Hunter Authorization    ║
╚════════════════════════════════════════╝`,

  "Default": `╔════════════════════════════════════════╗
║  Character Manifest – Arkham Registry  ║
╚════════════════════════════════════════╝`
};

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

function generateCharacterData(): void {
  maxHp = Math.floor(Math.random() * 11) + 5;
  currentHp = maxHp;
  currentSanity = maxSanity;

  characterName = generateName();
  characterOccupation = occupations[Math.floor(Math.random() * occupations.length)];

  const weaponChance = Math.random() < 0.05;
  const weapons = weaponChance
    ? getRandomSample(weaponPool, 2)
    : [weaponPool[Math.floor(Math.random() * weaponPool.length)]];

  weaponDetails = weapons.map(name => {
    const w = combatItems[name];
    return `${name} (${w.type}, ${w.damage}, uses: ${w.uses})`;
  });

  const supportNames = getRandomSample(supportItems, Math.floor(Math.random() * 4));
  supportDetails = supportNames.map(name => {
    const item = combatItems[name];
    return `${name} (${item.type}, ${item.damage}, uses: ${item.uses})`;
  });

  occupationItemsList = getRandomSample(
    occupationItems[characterOccupation] || [],
    Math.floor(Math.random() * 3) + 2
  );
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

  const character = `
${asciiArt}

Name: ${characterName}
Occupation: ${characterOccupation}
HP: ${currentHp}/${maxHp}
Sanity: ${currentSanity}/${maxSanity}

Inventory:
- Weapons: ${weaponDetails.join('\n  - ')}
- Support: \n  - ${supportDetails.join('\n  - ')}
- Occupation Items: \n  - ${occupationItemsList.join('\n  - ')}
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
  }
});

sanityPlus?.addEventListener('click', () => {
  if (output && currentSanity < maxSanity) {
    currentSanity++;
    renderCharacter(output, false);
  }
});
});
