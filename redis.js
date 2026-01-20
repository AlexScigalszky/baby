/**
 * Redis Client usando Redis Cloud REST API
 * 
 * Soporta dos modos:
 * 1. Redis Cloud con host, port, user, password
 * 2. Upstash (legacy) con url y token
 */

/**
 * Cliente Redis simple usando REST API
 */
class RedisClient {
  constructor(config) {
    // Configuración para Redis Cloud
    if (config.host && config.port && config.user && config.password) {
      this.type = "rediscloud";
      this.host = config.host;
      this.port = config.port;
      this.user = config.user;
      this.password = config.password;
      // Redis Cloud REST API endpoint (si está habilitado)
      // Nota: Redis Cloud requiere habilitar REST API o usar un proxy
      this.baseUrl = `https://${config.host}:${config.port}`;
      this.auth = btoa(`${config.user}:${config.password}`);
    }
    // Configuración legacy para Upstash
    else if (config.url && config.token) {
      this.type = "upstash";
      this.url = config.url;
      this.token = config.token;
      this.baseUrl = config.url.replace(/\/$/, "");
    } else {
      throw new Error("Configuración de Redis inválida");
    }
  }

  /**
   * Ejecuta un comando Redis usando REST API
   * @param {string[]} command - Array con el comando y sus argumentos
   * @returns {Promise<any>} Resultado del comando
   */
  async executeCommand(command) {
    try {
      if (this.type === "rediscloud") {
        return await this.executeRedisCloudCommand(command);
      } else {
        return await this.executeUpstashCommand(command);
      }
    } catch (error) {
      console.error("Error ejecutando comando Redis:", error);
      return null;
    }
  }

  /**
   * Ejecuta comando usando Redis Cloud REST API
   * Nota: Redis Cloud requiere REST API habilitada o un proxy debido a CORS
   */
  async executeRedisCloudCommand(command) {
    // Redis Cloud REST API endpoint
    // Formato: https://[host]/[command] o usar proxy
    const commandStr = command[0].toUpperCase();
    const args = command.slice(1);
    
    // Intentar usar REST API directamente (requiere estar habilitada en Redis Cloud)
    // Si falla por CORS, necesitarás usar un proxy
    const url = `https://${this.host}:${this.port}/${commandStr}`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${this.auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
        mode: "cors", // Intentar con CORS
      });

      if (!response.ok) {
        // Si falla, puede ser por CORS - usar proxy o mostrar error útil
        if (response.status === 0 || response.type === "opaque") {
          throw new Error("CORS error: Redis Cloud requiere REST API habilitada o un proxy. Ver consola para más información.");
        }
        throw new Error(`Redis Cloud API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.result ?? data;
    } catch (error) {
      // Si es error de CORS, mostrar instrucciones útiles
      if (error.message.includes("CORS") || error.message.includes("Failed to fetch")) {
        console.error(`
⚠️ Error de CORS con Redis Cloud.

Redis Cloud no expone REST API directamente desde el navegador por seguridad.

Soluciones:
1. Habilitar REST API en Redis Cloud Dashboard (si está disponible)
2. Usar un proxy REST API (ver documentación)
3. Usar Upstash Redis que tiene REST API nativa

Por ahora, usando almacenamiento en memoria local.
        `);
        return null;
      }
      throw error;
    }
  }

  /**
   * Ejecuta comando usando Upstash REST API (legacy)
   */
  async executeUpstashCommand(command) {
    const response = await fetch(`${this.baseUrl}/pipeline`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([command]),
    });

    if (!response.ok) {
      throw new Error(`Redis API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data[0]?.result ?? null;
  }

  /**
   * Obtiene un valor de Redis
   * @param {string} key - La clave
   * @returns {Promise<string|null>} El valor o null
   */
  async get(key) {
    const result = await this.executeCommand(["GET", key]);
    return result;
  }

  /**
   * Establece un valor en Redis
   * @param {string} key - La clave
   * @param {string} value - El valor
   * @returns {Promise<boolean>} true si fue exitoso
   */
  async set(key, value) {
    const result = await this.executeCommand(["SET", key, value]);
    return result === "OK";
  }

  /**
   * Incrementa un valor numérico en Redis
   * @param {string} key - La clave
   * @param {number} increment - Cantidad a incrementar (default: 1)
   * @returns {Promise<number>} El nuevo valor
   */
  async increment(key, increment = 1) {
    const result = await this.executeCommand(["INCRBY", key, String(increment)]);
    return parseInt(result) || 0;
  }

  /**
   * Decrementa un valor numérico en Redis
   * @param {string} key - La clave
   * @param {number} decrement - Cantidad a decrementar (default: 1)
   * @returns {Promise<number>} El nuevo valor
   */
  async decrement(key, decrement = 1) {
    return this.increment(key, -decrement);
  }

  /**
   * Obtiene todas las claves que coinciden con un patrón
   * @param {string} pattern - Patrón (ej: "name:*")
   * @returns {Promise<string[]>} Array de claves
   */
  async keys(pattern) {
    const result = await this.executeCommand(["KEYS", pattern]);
    return result || [];
  }

  /**
   * Obtiene múltiples valores
   * @param {string[]} keys - Array de claves
   * @returns {Promise<Array<string|null>>} Array de valores
   */
  async mget(keys) {
    if (!keys || keys.length === 0) return [];
    const result = await this.executeCommand(["MGET", ...keys]);
    return result || [];
  }

  /**
   * Elimina una clave
   * @param {string} key - La clave a eliminar
   * @returns {Promise<boolean>} true si fue eliminada
   */
  async del(key) {
    const result = await this.executeCommand(["DEL", key]);
    return result > 0;
  }

  /**
   * Establece el tiempo de expiración de una clave (en segundos)
   * @param {string} key - La clave
   * @param {number} seconds - Segundos hasta expirar
   * @returns {Promise<boolean>} true si fue exitoso
   */
  async expire(key, seconds) {
    const result = await this.executeCommand(["EXPIRE", key, String(seconds)]);
    return result === 1;
  }
}

/**
 * Cliente Redis global
 */
let redisClient = null;

/**
 * Inicializa el cliente Redis con la configuración
 * @param {Object} config - Configuración de Redis
 * @param {string} config.host - Host de Redis Cloud (opcional)
 * @param {number} config.port - Puerto de Redis Cloud (opcional)
 * @param {string} config.user - Usuario de Redis Cloud (opcional)
 * @param {string} config.password - Password de Redis Cloud (opcional)
 * @param {string} config.url - REST URL de Upstash (opcional, legacy)
 * @param {string} config.token - Token de Upstash (opcional, legacy)
 */
function initRedis(config) {
  if (!config) {
    console.warn("Redis no configurado. Usando almacenamiento en memoria local.");
    return;
  }

  try {
    // Priorizar Redis Cloud si está configurado
    if (config.host && config.port && config.user && config.password) {
      redisClient = new RedisClient({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
      });
      console.log("Redis Cloud inicializado correctamente");
    }
    // Fallback a Upstash (legacy)
    else if (config.url && config.token) {
      redisClient = new RedisClient({
        url: config.url,
        token: config.token,
      });
      console.log("Redis (Upstash) inicializado correctamente");
    } else {
      console.warn("Configuración de Redis incompleta. Usando almacenamiento en memoria local.");
    }
  } catch (error) {
    console.error("Error inicializando Redis:", error);
    console.warn("Usando almacenamiento en memoria local.");
  }
}

/**
 * Obtiene el cliente Redis
 * @returns {RedisClient|null}
 */
function getRedisClient() {
  return redisClient;
}

/**
 * Vota por un nombre guardando en Redis
 * @param {string} name - El nombre
 * @param {number} vote - 1 para +1, -1 para -1
 * @returns {Promise<number>} El nuevo total de votos
 */
async function voteForNameRedis(name, vote) {
  const client = getRedisClient();
  const key = `baby:name:${name}`;

  if (!client) {
    // Fallback a memoria local si Redis no está configurado
    return window.BABY_NAMES?.voteForName(name, vote) || 0;
  }

  try {
    // Usar INCRBY para operación atómica
    // Si es negativo, usar decrement explícitamente
    let newVotes;
    if (vote < 0) {
      newVotes = await client.decrement(key, Math.abs(vote));
    } else {
      newVotes = await client.increment(key, vote);
    }

    return newVotes;
  } catch (error) {
    console.error("Error votando en Redis:", error);
    // Fallback a memoria local
    return window.BABY_NAMES?.voteForName(name, vote) || 0;
  }
}

/**
 * Obtiene los votos de un nombre desde Redis
 * @param {string} name - El nombre
 * @returns {Promise<number>} Número de votos
 */
async function getNameVotesRedis(name) {
  const client = getRedisClient();
  const key = `baby:name:${name}`;

  if (!client) {
    // Fallback a memoria local
    return window.BABY_NAMES?.getNameVotes(name) || 0;
  }

  try {
    const votes = await client.get(key);
    return parseInt(votes) || 0;
  } catch (error) {
    console.error("Error obteniendo votos de Redis:", error);
    return window.BABY_NAMES?.getNameVotes(name) || 0;
  }
}

/**
 * Obtiene el top N de nombres más votados desde Redis
 * @param {number} topN - Número de nombres a retornar (default: 5)
 * @returns {Promise<Array<{name: string, votes: number}>>} Array de objetos con nombre y votos
 */
async function getTopNamesRedis(topN = 5) {
  const client = getRedisClient();

  if (!client) {
    // Fallback a memoria local
    return window.BABY_NAMES?.getTopNames(topN) || [];
  }

  try {
    const keys = await client.keys("baby:name:*");
    
    if (keys.length === 0) {
      return [];
    }

    const values = await client.mget(keys);
    const entries = keys
      .map((key, index) => {
        const name = key.replace("baby:name:", "");
        const votes = parseInt(values[index]) || 0;
        return { name, votes };
      })
      .filter((entry) => entry.votes > 0)
      .sort((a, b) => b.votes - a.votes)
      .slice(0, topN);

    return entries;
  } catch (error) {
    console.error("Error obteniendo top nombres de Redis:", error);
    return window.BABY_NAMES?.getTopNames(topN) || [];
  }
}

// Exportar para uso global
window.REDIS_CLIENT = {
  initRedis,
  getRedisClient,
  voteForNameRedis,
  getNameVotesRedis,
  getTopNamesRedis,
  RedisClient,
};

