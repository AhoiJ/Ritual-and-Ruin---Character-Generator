// data/names.ts
export const firstNames = [
    "Agnes", "Beatrice", "Cora", "Della", "Edna", "Florence", "Gladys", "Hattie",
    "Irene", "Josephine", "Lenora", "Mabel", "Nellie", "Opal", "Pearl", "Queenie",
    "Ruth", "Sylvia", "Thelma", "Velma", "Wilma", "Zelda",
    "Avis", "Bernice", "Clara", "Dorothy", "Eunice", "Faye", "Goldie", "Hazel",
    "Ida", "June", "Lillian", "Mamie", "Nina", "Olive", "Prudence", "Rosalie",
    "Susie", "Tilda", "Viola", "Winifred",
    "Albert", "Bernard", "Clyde", "Doyle", "Elmer", "Floyd", "Grover", "Herman",
    "Irving", "Jasper", "Lloyd", "Morris", "Norman", "Orville", "Percy", "Quincy",
    "Rufus", "Sidney", "Truman", "Vernon", "Wilbur", "Zeke",
    "Archie", "Buford", "Chester", "Delbert", "Earl", "Franklin", "Gilbert", "Harold",
    "Ira", "Judson", "Kenneth", "Leland", "Milton", "Norris", "Oscar", "Porter",
    "Raymond", "Sherman", "Thaddeus", "Warren", "Koutsi", "Jenni", "JP", "Otto", "Petri"
];
export const lastNames = [
    "Ashcroft", "Benedict", "Chamberlain", "Dunbar", "Ellsworth", "Fairchild",
    "Gainsborough", "Harrington", "Inglewood", "Jennings", "Kingsley", "Lancaster",
    "Merriweather", "Northwood", "Oakley", "Pennington", "Quimby", "Rutherford",
    "Sedgewick", "Thornhill", "Underwood", "Vanderbilt", "Wadsworth", "Yorke", "Zabriskie",
    "Abernathy", "Blackwood", "Carrington", "Devereux", "Eastwick", "Fitzgerald",
    "Grimsley", "Hollingsworth", "Iverson", "Jardine", "Kenworthy", "Litchfield",
    "Montague", "Norcross", "Osgood", "Pemberton", "Ravensdale", "Sinclair",
    "Tolliver", "Upton", "Vexley", "Whitmore", "Yarborough", "Zane"
];
export function generateName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
}
