# Configuración de Redis Cloud para Baby Names

Este proyecto ahora soporta **Redis Cloud** (cloud.redis.io) además de Upstash.

## ⚠️ Limitación importante

Redis Cloud **no expone REST API directamente desde el navegador** debido a restricciones de CORS. Tienes dos opciones:

### Opción 1: Habilitar REST API en Redis Cloud (Recomendado)

1. Ve a tu dashboard de Redis Cloud: https://cloud.redis.io
2. Selecciona tu base de datos
3. Ve a "Configuration" o "Settings"
4. Busca la opción "REST API" o "HTTP API"
5. Habilítala y copia el endpoint REST que te proporcionen
6. Actualiza la configuración en `script.js` con el endpoint REST

### Opción 2: Usar un Proxy REST API

Si REST API no está disponible, puedes crear un proxy simple usando:

#### Opción A: Vercel Edge Function (Gratis)

Crea un archivo `api/redis-proxy.js` en tu proyecto:

```javascript
export default async function handler(req, res) {
  const { command, args } = req.body;
  
  const redisHost = process.env.REDIS_HOST;
  const redisPort = process.env.REDIS_PORT;
  const redisUser = process.env.REDIS_USER;
  const redisPassword = process.env.REDIS_PASSWORD;
  
  // Ejecutar comando Redis usando una librería de Node.js
  // (requiere instalar redis o ioredis)
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  // ... lógica del proxy
}
```

#### Opción B: Cloudflare Workers (Gratis)

Similar a Vercel pero usando Cloudflare Workers.

#### Opción C: Usar Upstash (Más fácil)

Upstash tiene REST API nativa y funciona perfectamente desde el navegador sin necesidad de proxy.

## Configuración actual

Tu configuración actual en `script.js`:

```javascript
redis: {
  host: "redis-13828.c277.us-east-1-3.ec2.cloud.redislabs.com",
  port: 13828,
  user: "default",
  password: "BB2yqDodvLZEZnbgJrayr1lxCcaWmP7t",
}
```

## Solución rápida: Usar Upstash

Si prefieres una solución que funcione inmediatamente sin configuración adicional:

1. Ve a https://upstash.com/
2. Crea una cuenta gratuita
3. Crea una base de datos Redis
4. Copia el REST URL y Token
5. Actualiza `script.js`:

```javascript
redis: {
  // Redis Cloud (comentar si usas Upstash)
  // host: "...",
  // port: ...,
  // user: "...",
  // password: "...",
  
  // Upstash
  url: "TU_REST_URL_AQUI",
  token: "TU_TOKEN_AQUI",
}
```

## Fallback automático

Si Redis no está configurado o hay errores de conexión, la aplicación automáticamente usa almacenamiento en memoria local. Los votos se perderán al recargar la página, pero todas las demás funcionalidades seguirán funcionando.

## Seguridad

⚠️ **Importante**: Las credenciales de Redis están visibles en el código del cliente. 

- **Para proyectos personales/familiares**: Esto está bien
- **Para proyectos públicos**: Considera usar variables de entorno o un backend proxy

## Próximos pasos

1. Intenta habilitar REST API en Redis Cloud
2. Si no está disponible, considera usar Upstash para una solución más simple
3. O crea un proxy serverless usando Vercel/Cloudflare

