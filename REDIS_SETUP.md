# Configuración de Redis para Baby Names

Este proyecto usa **Upstash Redis** para almacenar los votos de nombres de forma persistente. Upstash ofrece una API REST que funciona directamente desde el navegador sin necesidad de un backend propio.

## Pasos para configurar Redis

### 1. Crear cuenta en Upstash

1. Ve a [https://upstash.com/](https://upstash.com/)
2. Crea una cuenta gratuita (tienen un generoso free tier)

### 2. Crear una base de datos Redis

1. Una vez dentro del dashboard, haz clic en "Create Database"
2. Elige la región más cercana a ti
3. Dale un nombre a tu base de datos (ej: "baby-names")
4. Haz clic en "Create"

### 3. Obtener las credenciales

1. Una vez creada la base de datos, haz clic en ella
2. Ve a la pestaña "REST API"
3. Copia los siguientes valores:
   - **UPSTASH_REDIS_REST_URL**: La URL REST (ej: `https://xxxxx.upstash.io`)
   - **UPSTASH_REDIS_REST_TOKEN**: El token de autenticación

### 4. Configurar en el proyecto

Abre el archivo `script.js` y busca la sección `BABY_CONFIG.redis`:

```javascript
redis: {
  // REST URL de Upstash (ejemplo: "https://xxxxx.upstash.io")
  url: "TU_REST_URL_AQUI",
  // Token de autenticación de Upstash
  token: "TU_TOKEN_AQUI",
},
```

Pega tus credenciales ahí:

```javascript
redis: {
  url: "https://tu-url.upstash.io",
  token: "tu-token-aqui",
},
```

### 5. ¡Listo!

Guarda el archivo y recarga la página. Los votos ahora se guardarán en Redis y persistirán entre sesiones.

## Fallback a memoria local

Si no configuras Redis, la aplicación seguirá funcionando usando almacenamiento en memoria local. Los votos se perderán al recargar la página, pero todas las demás funcionalidades seguirán funcionando normalmente.

## Seguridad

⚠️ **Importante**: Las credenciales de Redis están visibles en el código del cliente. Esto es normal para aplicaciones estáticas, pero significa que cualquiera puede ver tus credenciales si inspecciona el código.

- **Para proyectos personales/familiares**: Esto está bien, solo asegúrate de no compartir públicamente tu repositorio con las credenciales.
- **Para proyectos públicos**: Considera usar variables de entorno o un backend proxy que maneje las credenciales de forma segura.

## Límites del Free Tier de Upstash

- **10,000 comandos por día**: Más que suficiente para uso personal
- **256 MB de almacenamiento**: Suficiente para miles de nombres
- **Sin tarjeta de crédito requerida**

## Solución de problemas

### Los votos no se guardan

1. Verifica que las credenciales estén correctamente copiadas (sin espacios extra)
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que la URL y el token sean correctos en el dashboard de Upstash

### Error "Redis API error"

1. Verifica que tu base de datos esté activa en Upstash
2. Verifica que las credenciales sean correctas
3. Verifica que no hayas excedido el límite de comandos diarios

### La aplicación funciona pero no usa Redis

- Verifica que `redis.js` esté cargado antes de `script.js` en `index.html`
- Verifica que las credenciales estén configuradas en `BABY_CONFIG.redis`
- Revisa la consola del navegador para mensajes de advertencia

