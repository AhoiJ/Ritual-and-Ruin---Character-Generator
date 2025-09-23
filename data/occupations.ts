// data/occupations.ts

export const occupations: string[] = [
    "Private Investigator", "Jazz Musician", "Bootlegger", "Occult Scholar",
    "Flapper", "Newsboy", "Factory Worker", "Con Artist", "Radio Host", "Librarian",
    "Street Magician", "Speakeasy Bartender", "Gravedigger", "Cultist Defector",
    "Cabaret Dancer", "Cryptographer", "Paranormal Investigator", "Antique Dealer",
    "Asylum Nurse", "Aviator", "Rum Runner", "Bellhop", "Stenographer",
    "Snake Oil Salesman", "Lighthouse Keeper", "Radio Technician", "Newspaper Editor",
    "Carnival Barker", "Chemistry Professor", "Bank Robber", "Train Conductor",
    "Seance Medium", "Union Organizer", "Jazz Club Owner", "WWI Veteran",
    "Bookstore Clerk", "Forensic Analyst", "Museum Curator", "Moonshine Chemist",
    "Bounty Hunter"
];

export const occupationItems: Record<string, string[]> = {
    "Private Investigator": ["Notebook", "Flashlight", "Cigarette Case", "Old Photograph"],
    "Jazz Musician": ["Whiskey Flask", "Deck of Cards", "Matchbook", "Opera Tickets"],
    "Bootlegger": ["Map", "Lockpick Set", "Tin of Mints", "Monogrammed Lighter"],
    "Occult Scholar": ["Pocket Bible", "Cracked Mirror", "Pressed Flower", "Notebook"],
    "Flapper": ["Perfume Vial", "Silk Scarf", "Opera Tickets", "Cufflinks"],
    "Newsboy": ["Train Schedule", "Coin Purse", "Notebook", "Reading Glasses"],
    "Factory Worker": ["Handkerchief", "Tin of Mints", "Rusty Key", "Deck of Cards"],
    "Con Artist": ["Calling Card", "Cigarette Case", "Monogrammed Lighter", "Cracked Mirror"],
    "Radio Host": ["Fountain Pen", "Library Card", "Notebook", "Train Schedule"],
    "Librarian": ["Reading Glasses", "Library Card", "Notebook", "Pressed Flower"],
    "Street Magician": ["Deck of Cards", "Matchbook", "Cracked Mirror", "Rusty Key"],
    "Speakeasy Bartender": ["Whiskey Flask", "Opera Tickets", "Cigarette Case", "Tin of Mints"],
    "Gravedigger": ["Rusty Key", "Cracked Mirror", "Old Photograph", "Handkerchief"],
    "Cultist Defector": ["Pocket Bible", "Cracked Mirror", "Empty Envelope", "Pressed Flower"],
    "Cabaret Dancer": ["Silk Scarf", "Perfume Vial", "Opera Tickets", "Cufflinks"],
    "Cryptographer": ["Notebook", "Fountain Pen", "Library Card", "Train Schedule"],
    "Paranormal Investigator": ["Flashlight", "Notebook", "Old Photograph", "Cracked Mirror"],
    "Antique Dealer": ["Engraved Compass", "Old Photograph", "Pocket Watch", "Reading Glasses"],
    "Asylum Nurse": ["Bandage Roll", "Handkerchief", "Notebook", "Perfume Vial"],
    "Aviator": ["Map", "Engraved Compass", "Train Schedule", "Cigarette Case"],
    "Rum Runner": ["Lockpick Set", "Map", "Whiskey Flask", "Tin of Mints"],
    "Bellhop": ["Coin Purse", "Train Schedule", "Calling Card", "Handkerchief"],
    "Stenographer": ["Notebook", "Fountain Pen", "Reading Glasses", "Library Card"],
    "Snake Oil Salesman": ["Tin of Mints", "Perfume Vial", "Calling Card", "Cracked Mirror"],
    "Lighthouse Keeper": ["Flashlight", "Old Photograph", "Rusty Key", "Notebook"],
    "Radio Technician": ["Notebook", "Library Card", "Train Schedule", "Fountain Pen"],
    "Newspaper Editor": ["Notebook", "Reading Glasses", "Library Card", "Cigarette Case"],
    "Carnival Barker": ["Deck of Cards", "Matchbook", "Calling Card", "Tin of Mints"],
    "Chemistry Professor": ["Notebook", "Fountain Pen", "Library Card", "Pressed Flower"],
    "Bank Robber": ["Lockpick Set", "Map", "Cigarette Case", "Rusty Key"],
    "Train Conductor": ["Pocket Watch", "Train Schedule", "Coin Purse", "Handkerchief"],
    "Seance Medium": ["Cracked Mirror", "Pressed Flower", "Old Photograph", "Perfume Vial"],
    "Union Organizer": ["Notebook", "Library Card", "Train Schedule", "Handkerchief"],
    "Jazz Club Owner": ["Opera Tickets", "Whiskey Flask", "Cufflinks", "Monogrammed Lighter"],
    "WWI Veteran": ["Old Photograph", "Pocket Watch", "Rusty Key", "Handkerchief"],
    "Bookstore Clerk": ["Library Card", "Notebook", "Reading Glasses", "Pressed Flower"],
    "Forensic Analyst": ["Notebook", "Flashlight", "Library Card", "Fountain Pen"],
    "Museum Curator": ["Engraved Compass", "Old Photograph", "Reading Glasses", "Pocket Watch"],
    "Moonshine Chemist": ["Whiskey Flask", "Tin of Mints", "Notebook", "Lockpick Set"],
    "Bounty Hunter": ["Map", "Flashlight", "Rusty Key", "Deck of Cards"]
};

export const asciiBanners: Record<string, string> = {
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

    "Corrupted": `╔══════════════════════════════════╗
║                         THRALL OF THE ELDER ONE                              ║
╚══════════════════════════════════╝`,

    "Default": `╔════════════════════════════════════════╗
║  Character Manifest – Arkham Registry  ║
╚════════════════════════════════════════╝`
};