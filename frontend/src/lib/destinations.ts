export interface Destination {
  id: string;
  name: string;
  description: string;
  type: "city" | "nature" | "desert" | "beach";
  highlights: string[];
  bestTime: string;
  dailyCost: number;
  popularity: number;
}

export const destinations: Destination[] = [
  { id: "marrakech", name: "Marrakech", description: "The Red City — vibrant souks, stunning palaces, and the iconic Jemaa el-Fnaa square.", type: "city", highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace"], bestTime: "Oct–Apr", dailyCost: 45, popularity: 98 },
  { id: "chefchaouen", name: "Chefchaouen", description: "The Blue Pearl of Morocco, nestled in the Rif Mountains with stunning blue-washed streets.", type: "city", highlights: ["Blue Medina", "Ras El Maa", "Spanish Mosque"], bestTime: "Mar–Jun", dailyCost: 30, popularity: 92 },
  { id: "fes", name: "Fes", description: "The spiritual capital with the world's oldest university and largest car-free urban area.", type: "city", highlights: ["Al-Qarawiyyin", "Chouara Tannery", "Bou Inania"], bestTime: "Mar–May", dailyCost: 35, popularity: 90 },
  { id: "sahara", name: "Sahara Desert", description: "Endless golden dunes, camel treks, and unforgettable starlit nights in the desert.", type: "desert", highlights: ["Erg Chebbi", "Camel Trek", "Desert Camp"], bestTime: "Oct–Apr", dailyCost: 60, popularity: 95 },
  { id: "essaouira", name: "Essaouira", description: "A windy coastal gem with a bohemian vibe, fresh seafood, and historic ramparts.", type: "beach", highlights: ["Medina Walls", "Beach", "Port"], bestTime: "Jun–Sep", dailyCost: 40, popularity: 85 },
  { id: "casablanca", name: "Casablanca", description: "Morocco's economic capital featuring the stunning Hassan II Mosque on the Atlantic coast.", type: "city", highlights: ["Hassan II Mosque", "Corniche", "Old Medina"], bestTime: "Apr–Nov", dailyCost: 50, popularity: 80 },
  { id: "tangier", name: "Tangier", description: "A gateway city where Africa meets Europe, with a rich artistic and literary heritage.", type: "city", highlights: ["Kasbah Museum", "Cap Spartel", "Caves of Hercules"], bestTime: "May–Oct", dailyCost: 40, popularity: 78 },
  { id: "ouarzazate", name: "Ouarzazate", description: "The 'Door of the Desert' — Hollywood of Morocco with ancient kasbahs and film studios.", type: "desert", highlights: ["Aït Benhaddou", "Atlas Studios", "Draa Valley"], bestTime: "Mar–May", dailyCost: 35, popularity: 75 },
  { id: "dades", name: "Dades Valley", description: "Dramatic gorges, rose valleys, and breathtaking mountain scenery in the High Atlas.", type: "nature", highlights: ["Todra Gorge", "Rose Valley", "Dades Gorge"], bestTime: "Apr–Jun", dailyCost: 30, popularity: 72 },
  { id: "ifrane", name: "Ifrane", description: "The 'Switzerland of Morocco' — cedar forests, skiing, and crisp mountain air.", type: "nature", highlights: ["Cedar Forest", "Michlifen Ski", "Lake Dayet Aoua"], bestTime: "Dec–Mar", dailyCost: 45, popularity: 65 },
];
