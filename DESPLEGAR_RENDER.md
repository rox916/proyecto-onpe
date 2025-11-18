# 🚀 Guía de Despliegue en Render

## 📋 Requisitos Previos

1. Cuenta en [Render](https://render.com) (gratis)
2. Repositorio en GitHub
3. Código del backend listo

## 🎯 Pasos para Desplegar

### 1. Crear Cuenta en Render

1. Ve a: https://render.com
2. Haz clic en **"Get Started for Free"**
3. Inicia sesión con GitHub (recomendado)

### 2. Crear Base de Datos PostgreSQL

1. En el Dashboard de Render, haz clic en **"+ New"**
2. Selecciona **"PostgreSQL"**
3. Configura:
   - **Name**: `sistema-votacion-db` (o el nombre que prefieras)
   - **Database**: `sistema_votacion`
   - **User**: `sistema_votacion_user`
   - **Region**: Elige la más cercana (ej: `Oregon (US West)`)
   - **PostgreSQL Version**: `16` (o la más reciente)
   - **Plan**: `Free` (para empezar)
4. Haz clic en **"Create Database"**
5. **IMPORTANTE**: Anota las credenciales que Render te muestra:
   - **Internal Database URL**
   - **Host**
   - **Port**
   - **Database Name**
   - **User**
   - **Password**

### 3. Crear Servicio Web (Backend)

1. En el Dashboard, haz clic en **"+ New"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub:
   - Selecciona tu repositorio
   - Selecciona la rama (ej: `main` o `master`)
4. Configura el servicio:

#### Configuración Básica:
- **Name**: `sistema-votacion-backend`
- **Region**: La misma que tu base de datos
- **Branch**: `main` (o tu rama principal)
- **Root Directory**: `sistema-votacion-backend` ⚠️ **IMPORTANTE**

#### Build & Deploy:
- **Environment**: `Java`
- **Build Command**: 
  ```
  ./mvnw clean package -DskipTests
  ```
- **Start Command**: 
  ```
  java -jar target/sistema-votacion-backend-0.0.1-SNAPSHOT.jar
  ```

#### Plan:
- **Plan**: `Free` (para empezar)

### 4. Configurar Variables de Entorno

En la sección **"Environment Variables"** de tu servicio web, agrega:

#### Variables de Base de Datos:
```
PGHOST=<tu-host-de-postgresql>
PGPORT=<tu-puerto>
PGDATABASE=sistema_votacion
PGUSER=sistema_votacion_user
PGPASSWORD=<tu-password>
```

**💡 TIP**: Render puede generar estas variables automáticamente si conectas la base de datos:
1. En tu servicio web, ve a **"Environment"**
2. Haz clic en **"Link Database"**
3. Selecciona tu base de datos PostgreSQL
4. Render agregará automáticamente las variables `PGHOST`, `PGPORT`, etc.

#### Otras Variables:
```
JAVA_VERSION=17
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=10000
```

**⚠️ IMPORTANTE**: Render asigna el puerto dinámicamente a través de `PORT`, pero Spring Boot necesita `SERVER_PORT`. Ya está configurado en `application.properties` para usar `${PORT:8082}`.

### 5. Configurar el Puerto

Render asigna el puerto a través de la variable `PORT`. Asegúrate de que `application.properties` use:
```properties
server.port=${PORT:8082}
```

Ya está configurado correctamente ✅

### 6. Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir y desplegar automáticamente
3. Puedes ver el progreso en la pestaña **"Logs"**
4. Cuando termine, verás **"Your service is live"**

### 7. Obtener la URL

Render te dará una URL automáticamente:
```
https://sistema-votacion-backend.onrender.com
```

O puedes configurar un dominio personalizado en **"Settings"** → **"Custom Domain"**

## ✅ Verificar el Despliegue

Prueba tu API:
```
https://tu-backend.onrender.com/api/candidatos
```

O con curl:
```bash
curl https://tu-backend.onrender.com/api/candidatos
```

## 🔧 Configuración Adicional

### Conectar Base de Datos Automáticamente

1. En tu servicio web → **"Environment"**
2. Haz clic en **"Link Database"**
3. Selecciona tu base de datos PostgreSQL
4. Render agregará automáticamente todas las variables `PG*`

### Configurar CORS para tu Frontend

Agrega la variable de entorno:
```
FRONTEND_URL=https://tu-frontend.vercel.app
```

El código ya está configurado para leer esta variable ✅

## 🐛 Solución de Problemas

### Error: "Build failed"
**Solución:**
1. Ve a **"Logs"** para ver el error específico
2. Verifica que `Root Directory` sea `sistema-votacion-backend`
3. Verifica que `Build Command` use `./mvnw` (no `mvn`)
4. Verifica que Java 17 esté disponible

### Error: "Cannot connect to database"
**Solución:**
1. Verifica que las variables `PG*` estén configuradas
2. Usa **"Link Database"** para conectarlas automáticamente
3. Verifica que la base de datos esté activa

### Error: "Port already in use"
**Solución:**
- Render maneja esto automáticamente
- Verifica que `application.properties` use `${PORT}` (ya está configurado)

### El servicio se "duerme" (Free Plan)
**Solución:**
- En el plan Free, Render "duerme" el servicio después de 15 minutos de inactividad
- La primera petición después de dormir puede tardar ~30 segundos en despertar
- Para evitar esto, considera el plan **Starter** ($7/mes)

## 📝 Checklist Final

- [ ] Cuenta creada en Render
- [ ] Base de datos PostgreSQL creada
- [ ] Servicio web creado
- [ ] Root Directory configurado: `sistema-votacion-backend`
- [ ] Build Command: `./mvnw clean package -DskipTests`
- [ ] Start Command: `java -jar target/sistema-votacion-backend-0.0.1-SNAPSHOT.jar`
- [ ] Variables de entorno configuradas (PGHOST, PGPORT, etc.)
- [ ] Base de datos conectada (Link Database)
- [ ] Build exitoso
- [ ] URL pública funcionando

## 🎉 ¡Listo!

Una vez desplegado, tu backend estará disponible públicamente y podrás conectarlo con tu frontend.

## 🔗 URLs Importantes

- **Render Dashboard**: https://dashboard.render.com
- **Documentación Render**: https://render.com/docs
- **Tu Backend**: Se mostrará en el dashboard de Render

## 💡 Ventajas de Render vs Railway

- ✅ Plan Free más generoso
- ✅ No se "duerme" tan rápido (aunque sí se duerme después de 15 min)
- ✅ Interfaz más simple
- ✅ Mejor documentación
- ✅ Soporte para Java 17 nativo

