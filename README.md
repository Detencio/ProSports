# ProSports - Plataforma Integral de Gestión Deportiva

## 📋 Descripción

ProSports es una plataforma integral de gestión deportiva que permite la administración completa de campeonatos, ligas, torneos, equipos, jugadores y partidos. La plataforma incluye funcionalidades avanzadas como análisis de rendimiento, gestión financiera y sistema de notificaciones en tiempo real.

## 🚀 Características Principales

- **Gestión de Campeonatos**: Creación y administración de ligas, torneos y campeonatos
- **Registro de Jugadores**: Sistema completo de registro y gestión de jugadores
- **Gestión de Equipos**: Administración de equipos con perfiles detallados
- **Seguimiento de Partidos**: Control de partidos, resultados y estadísticas
- **Administración Financiera**: Gestión de presupuestos, pagos y finanzas
- **Análisis de Rendimiento**: Dashboard con métricas y análisis avanzados
- **Sistema de Notificaciones**: Notificaciones en tiempo real para eventos importantes

## 🏗️ Arquitectura

### Frontend
- **Framework**: React 18 con TypeScript
- **UI Framework**: Tailwind CSS con Headless UI
- **Estado**: Zustand para gestión de estado
- **Rutas**: React Router v6
- **Consultas**: TanStack Query (React Query)
- **Formularios**: React Hook Form
- **Gráficos**: Recharts
- **WebSockets**: Socket.io Client

### Backend
- **Framework**: NestJS con TypeScript
- **Base de Datos**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Autenticación**: JWT
- **WebSockets**: Socket.io
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator

### DevOps
- **Contenedores**: Docker
- **CI/CD**: GitHub Actions
- **Despliegue Frontend**: Vercel
- **Despliegue Backend**: Railway/Render
- **Base de Datos**: Supabase

## 🛠️ Stack Tecnológico

### Frontend
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "@headlessui/react": "^1.7.0",
  "@heroicons/react": "^2.0.0",
  "@tanstack/react-query": "^5.0.0",
  "react-router-dom": "^6.20.0",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.48.0",
  "recharts": "^2.8.0",
  "socket.io-client": "^4.7.0"
}
```

### Backend
```json
{
  "@nestjs/core": "^10.0.0",
  "@nestjs/common": "^10.0.0",
  "@nestjs/config": "^3.0.0",
  "@nestjs/swagger": "^7.0.0",
  "@prisma/client": "^5.0.0",
  "prisma": "^5.0.0",
  "socket.io": "^4.7.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0"
}
```

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Git
- Cuenta en Supabase

### Configuración Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/prosports.git
cd prosports
```

2. **Configurar Supabase**
   - Crear un proyecto en [Supabase](https://supabase.com)
   - Obtener las credenciales de conexión
   - Copiar `backend/supabase.env.example` a `backend/.env`
   - Actualizar las variables de entorno con tus credenciales

3. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

4. **Configurar la base de datos**
```bash
npx prisma generate
npx prisma db push
```

5. **Instalar dependencias del frontend**
```bash
cd ../frontend
npm install
```

6. **Configurar variables de entorno del frontend**
```bash
cp .env.example .env
# Actualizar REACT_APP_API_URL con la URL de tu backend
```

### Ejecutar en Desarrollo

1. **Backend**
```bash
cd backend
npm run start:dev
```

2. **Frontend**
```bash
cd frontend
npm start
```

### Ejecutar con Docker

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d
```

## 🚀 Despliegue

### Frontend (Vercel)

1. **Conectar repositorio a Vercel**
   - Ir a [Vercel](https://vercel.com)
   - Importar el repositorio de GitHub
   - Configurar las variables de entorno:
     - `REACT_APP_API_URL`: URL del backend desplegado

2. **Despliegue automático**
   - Cada push a `main` desplegará automáticamente
   - Vercel detectará automáticamente que es una app React

### Backend (Railway/Render)

1. **Railway**
   - Conectar repositorio a Railway
   - Configurar variables de entorno
   - Railway detectará automáticamente NestJS

2. **Render**
   - Crear nuevo Web Service
   - Conectar repositorio
   - Configurar build command: `npm run build`
   - Configurar start command: `npm run start:prod`

### Base de Datos (Supabase)

1. **Configurar Supabase**
   - Crear proyecto en Supabase
   - Ejecutar migraciones de Prisma
   - Configurar RLS (Row Level Security)

2. **Variables de entorno necesarias**
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"
```

## 📚 Documentación

- [Documentación de la API](./docs/api.md)
- [Guía de Desarrollo](./docs/development.md)
- [Configuración de Supabase](./docs/supabase-setup.md)

## 🧪 Testing

### Backend
```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

### Frontend
```bash
# Tests
npm test

# Tests con coverage
npm test -- --coverage
```

## 📊 Estructura de la Base de Datos

### Entidades Principales

- **Users**: Usuarios del sistema con roles
- **Teams**: Equipos deportivos
- **Players**: Jugadores registrados
- **Tournaments**: Torneos y campeonatos
- **Matches**: Partidos y resultados
- **Statistics**: Estadísticas de jugadores
- **Financial**: Gestión financiera
- **Notifications**: Sistema de notificaciones

### Roles y Permisos

- **ADMIN**: Acceso completo al sistema
- **MANAGER**: Gestión de equipos y torneos
- **COACH**: Gestión de jugadores y partidos
- **PLAYER**: Acceso a estadísticas personales
- **USER**: Acceso básico de lectura

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/prosports/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/prosports/wiki)
- **Email**: soporte@prosports.com

## 🔄 Changelog

### v1.0.0
- ✅ Integración con Supabase
- ✅ Migración a Tailwind CSS
- ✅ Configuración de despliegue en Vercel
- ✅ Sistema de autenticación JWT
- ✅ WebSockets para notificaciones en tiempo real
- ✅ API REST completa con documentación Swagger 