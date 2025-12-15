// Arrays de nombres para niñas y niños
const GIRL_NAMES = [
  "Sofía",
  "Valentina",
  "Isabella",
  "Emma",
  "Olivia",
  "Martina",
  "Lucía",
  "Victoria",
  "Emilia",
  "Catalina",
  "Camila",
  "Amelia",
  "Mía",
  "Antonella",
  "Julieta",
  "Elena",
  "María",
  "Ana",
  "Laura",
  "Paula",
  "Andrea",
  "Gabriela",
  "Natalia",
  "Carolina",
  "Daniela",
  "Fernanda",
  "Alejandra",
  "Clara",
  "Adriana",
  "Patricia",
  // Extra ~150 girl names
  "Alicia",
  "Alexandra",
  "Aitana",
  "Abril",
  "Agustina",
  "Alma",
  "Ámbar",
  "Ariadna",
  "Ángela",
  "Angélica",
  "Ainhoa",
  "Alba",
  "Bianca",
  "Bárbara",
  "Brenda",
  "Brisa",
  "Carla",
  "Celeste",
  "Celia",
  "Cecilia",
  "Claudia",
  "Constanza",
  "Candela",
  "Carmina",
  "Carmen",
  "Cristina",
  "Denise",
  "Diana",
  "Dolores",
  "Dominique",
  "Elisa",
  "Elsa",
  "Eliana",
  "Elizabeth",
  "Erika",
  "Eva",
  "Fátima",
  "Florencia",
  "Fiorella",
  "Francisca",
  "Gisella",
  "Guadalupe",
  "Inés",
  "Irina",
  "Irene",
  "Ivana",
  "Isabel",
  "Jimena",
  "Josefina",
  "Jazmín",
  "Karen",
  "Karina",
  "Leticia",
  "Lola",
  "Lorena",
  "Lourdes",
  "Luna",
  "Luz",
  "Magdalena",
  "Malena",
  "Mara",
  "Mariana",
  "Mariela",
  "Marina",
  "Melina",
  "Melisa",
  "Milagros",
  "Mónica",
  "Morena",
  "Montserrat",
  "Nadia",
  "Noelia",
  "Noemí",
  "Nuria",
  "Paz",
  "Pilar",
  "Priscila",
  "Raquel",
  "Rebeca",
  "Regina",
  "Rocío",
  "Romina",
  "Salomé",
  "Samanta",
  "Sara",
  "Silvia",
  "Sol",
  "Tamara",
  "Teresa",
  "Tania",
  "Tatiana",
  "Triana",
  "Úrsula",
  "Valeria",
  "Vanesa",
  "Verónica",
  "Violeta",
  "Yanina",
  "Yesica",
  "Zoe",
  "Zaira",
  "Abril",
  "Alison",
  "Amparo",
  "Azul",
  "Belén",
  "Berenice",
  "Candela",
  "Carolina",
  "Celina",
  "Chiara",
  "Clarisa",
  "Coral",
  "Dana",
  "Delfina",
  "Elisabet",
  "Ema",
  "Esmeralda",
  "Estefanía",
  "Eugenia",
  "Fatima",
  "Flavia",
  "Giuliana",
  "Helena",
  "Itzel",
  "Jade",
  "Juliana",
  "Kiara",
  "Lia",
  "Lila",
  "Liz",
  "Luana",
  "Maia",
  "Malía",
  "Maru",
  "Micaela",
  "Mireya",
  "Nadia",
  "Nayla",
  "Nicole",
  "Nina",
  "Olga",
  "Ornella",
  "Paloma",
  "Patricia",
  "Renata",
  "Romina",
  "Sabrina",
  "Samara",
  "Sheila",
  "Sofía",
  "Tamia",
  "Thalía",
  "Valery",
  "Vera",
  "Yamila",
  "Zulema",
];

const BOY_NAMES = [
  "Mateo",
  "Santiago",
  "Sebastián",
  "Benjamín",
  "Matías",
  "Nicolás",
  "Lucas",
  "Diego",
  "Joaquín",
  "Tomás",
  "Martín",
  "Alejandro",
  "Gabriel",
  "Daniel",
  "Carlos",
  "Andrés",
  "Felipe",
  "Juan",
  "José",
  "Miguel",
  "David",
  "Pablo",
  "Fernando",
  "Ricardo",
  "Roberto",
  "Francisco",
  "Javier",
  "Manuel",
  "Luis",
  "Pedro",
  // Extra ~150 boy names
  "Adrián",
  "Agustín",
  "Alberto",
  "Alex",
  "Alfonso",
  "Alonso",
  "Álvaro",
  "Amaro",
  "Amir",
  "Aníbal",
  "Antonio",
  "Axel",
  "Baltasar",
  "Bruno",
  "Camilo",
  "Ciro",
  "Cristian",
  "Damián",
  "Darío",
  "Domingo",
  "Eduardo",
  "Elías",
  "Emiliano",
  "Emilio",
  "Enrique",
  "Esteban",
  "Ezequiel",
  "Facundo",
  "Fausto",
  "Federico",
  "Félix",
  "Franco",
  "Gael",
  "Gaspar",
  "Germán",
  "Gonzalo",
  "Guillermo",
  "Héctor",
  "Hernán",
  "Hugo",
  "Ignacio",
  "Isaac",
  "Iván",
  "Jacobo",
  "Jesús",
  "Jordán",
  "Jorge",
  "Josué",
  "Juan Pablo",
  "Kevin",
  "Leandro",
  "Leo",
  "León",
  "Lisandro",
  "Lorenzo",
  "Lucas",
  "Luciano",
  "Lautaro",
  "Marcos",
  "Marco",
  "Mario",
  "Mauricio",
  "Maximiliano",
  "Máximo",
  "Nahir",
  "Nahuel",
  "Nelson",
  "Octavio",
  "Óscar",
  "Pascual",
  "Patricio",
  "Rafael",
  "Raimundo",
  "Ramiro",
  "Ramón",
  "Raúl",
  "Renato",
  "Rodrigo",
  "Salvador",
  "Samuel",
  "Sergio",
  "Simón",
  "Thiago",
  "Tobías",
  "Ulises",
  "Valentín",
  "Vicente",
  "Víctor",
  "Yeray",
  "Yago",
  "Zacarías",
  "Abel",
  "Adriel",
  "Alan",
  "Aldo",
  "Amadeo",
  "Anselmo",
  "Arnoldo",
  "Arturo",
  "Baltazar",
  "Benicio",
  "Boris",
  "César",
  "Cristóbal",
  "Dariel",
  "Dante",
  "Elian",
  "Emir",
  "Ernesto",
  "Esteban",
  "Fabrizio",
  "Franco",
  "Gael",
  "Galo",
  "Guido",
  "Ian",
  "Iker",
  "Ismael",
  "Joan",
  "Jonás",
  "Julián",
  "Justo",
  "Kenai",
  "Lian",
  "Lucio",
  "Manu",
  "Matheo",
  "Naim",
  "Omar",
  "Orión",
  "Piero",
  "Rayan",
  "René",
  "Rodrigo",
  "Santino",
  "Sasha",
  "Sergi",
  "Teo",
  "Tristán",
  "Uriel",
  "Vladimir",
  "Wilson",
  "Yahir",
  "Zaid",
];

/**
 * Estado en memoria para evitar repetir nombres en la misma sesión.
 * No se persiste: se reinicia al recargar la página.
 */
const BABY_NAME_STATE = {
  visitedGirl: new Set(),
  visitedBoy: new Set(),
};

/**
 * Selecciona un nombre aleatorio según el sexo especificado,
 * evitando repetir hasta haber usado todos los nombres disponibles
 * para esa categoría. Luego reinicia el ciclo.
 * @param {string} sex - "boy" | "girl" | "undefined"
 * @returns {string} Un nombre aleatorio del array correspondiente
 */
function getRandomName(sex) {
  // Helpers internos
  const pickFrom = (list, visitedSet) => {
    // Si ya usamos todos, reiniciamos el set
    if (visitedSet.size >= list.length) {
      visitedSet.clear();
    }

    // Construimos una lista de índices no visitados
    const availableIndexes = [];
    for (let i = 0; i < list.length; i++) {
      if (!visitedSet.has(i)) {
        availableIndexes.push(i);
      }
    }

    // Seguridad: si por alguna razón no hay disponibles, devolvemos aleatorio total
    if (availableIndexes.length === 0) {
      const fallbackIndex = Math.floor(Math.random() * list.length);
      return list[fallbackIndex];
    }

    const randomIndex =
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    visitedSet.add(randomIndex);
    return list[randomIndex];
  };

  if (sex === "girl") {
    return pickFrom(GIRL_NAMES, BABY_NAME_STATE.visitedGirl);
  } else if (sex === "boy") {
    return pickFrom(BOY_NAMES, BABY_NAME_STATE.visitedBoy);
  } else {
    // undefined: combinamos ambos, pero mantenemos estado por lista
    // Primero decidimos si sacamos de niñas o niños equilibrando un poco
    const totalGirlRemaining = GIRL_NAMES.length - BABY_NAME_STATE.visitedGirl.size;
    const totalBoyRemaining = BOY_NAMES.length - BABY_NAME_STATE.visitedBoy.size;
    const totalRemaining = totalGirlRemaining + totalBoyRemaining;

    // Si por algún motivo no hay restantes (muy improbable), reiniciamos ambos
    if (totalRemaining <= 0) {
      BABY_NAME_STATE.visitedGirl.clear();
      BABY_NAME_STATE.visitedBoy.clear();
      return getRandomName("undefined");
    }

    const girlChance = totalGirlRemaining / totalRemaining;
    if (Math.random() < girlChance) {
      return pickFrom(GIRL_NAMES, BABY_NAME_STATE.visitedGirl);
    } else {
      return pickFrom(BOY_NAMES, BABY_NAME_STATE.visitedBoy);
    }
  }
}

/**
 * Obtiene un nombre basado en la configuración global del bebé.
 * @returns {string} Un nombre aleatorio según el sexo configurado
 */
function getBabyName() {
  const config = window.BABY_CONFIG || {};
  const sex = config.sex || "undefined";
  return getRandomName(sex);
}

// Exportar funciones para uso global
window.BABY_NAMES = {
  getRandomName,
  getBabyName,
  GIRL_NAMES,
  BOY_NAMES,
};

