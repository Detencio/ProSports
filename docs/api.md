# Documentación de la API - ProSports

## 📋 Información General

- **Base URL**: `http://localhost:3001/api`
- **Versión**: 1.0
- **Formato de respuesta**: JSON
- **Autenticación**: JWT Bearer Token

## 🔐 Autenticación

### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clh123456789",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "ADMIN"
  }
}
```

### Registro
```http
POST /auth/register
```

**Body:**
```json
{
  "email": "nuevo@ejemplo.com",
  "password": "contraseña123",
  "firstName": "María",
  "lastName": "García",
  "role": "USER"
}
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <token>
```

## 👥 Usuarios

### Obtener todos los usuarios
```http
GET /users
Authorization: Bearer <token>
```

### Obtener usuario por ID
```http
GET /users/{id}
Authorization: Bearer <token>
```

### Crear usuario
```http
POST /users
Authorization: Bearer <token>
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "USER"
}
```

### Actualizar usuario
```http
PUT /users/{id}
Authorization: Bearer <token>
```

### Eliminar usuario
```http
DELETE /users/{id}
Authorization: Bearer <token>
```

## 🏆 Equipos

### Obtener todos los equipos
```http
GET /teams
Authorization: Bearer <token>
```

### Obtener equipo por ID
```http
GET /teams/{id}
Authorization: Bearer <token>
```

### Crear equipo
```http
POST /teams
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Real Madrid",
  "description": "Equipo de fútbol español",
  "logo": "https://ejemplo.com/logo.png",
  "founded": 1902,
  "city": "Madrid",
  "country": "España"
}
```

### Actualizar equipo
```http
PUT /teams/{id}
Authorization: Bearer <token>
```

### Eliminar equipo
```http
DELETE /teams/{id}
Authorization: Bearer <token>
```

### Agregar miembro al equipo
```http
POST /teams/{id}/members
Authorization: Bearer <token>
```

**Body:**
```json
{
  "userId": "clh123456789",
  "role": "PLAYER"
}
```

## ⚽ Jugadores

### Obtener todos los jugadores
```http
GET /players
Authorization: Bearer <token>
```

### Obtener jugador por ID
```http
GET /players/{id}
Authorization: Bearer <token>
```

### Crear jugador
```http
POST /players
Authorization: Bearer <token>
```

**Body:**
```json
{
  "firstName": "Lionel",
  "lastName": "Messi",
  "dateOfBirth": "1987-06-24",
  "position": "FORWARD",
  "jerseyNumber": 10,
  "height": 170,
  "weight": 72,
  "nationality": "Argentina",
  "teamId": "clh123456789"
}
```

### Actualizar jugador
```http
PUT /players/{id}
Authorization: Bearer <token>
```

### Eliminar jugador
```http
DELETE /players/{id}
Authorization: Bearer <token>
```

## 🏆 Torneos

### Obtener todos los torneos
```http
GET /tournaments
Authorization: Bearer <token>
```

### Obtener torneo por ID
```http
GET /tournaments/{id}
Authorization: Bearer <token>
```

### Crear torneo
```http
POST /tournaments
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Liga Española 2024",
  "description": "Torneo de fútbol profesional",
  "startDate": "2024-08-15",
  "endDate": "2024-05-15",
  "type": "LEAGUE",
  "maxTeams": 20
}
```

### Actualizar torneo
```http
PUT /tournaments/{id}
Authorization: Bearer <token>
```

### Eliminar torneo
```http
DELETE /tournaments/{id}
Authorization: Bearer <token>
```

### Agregar equipo al torneo
```http
POST /tournaments/{id}/teams
Authorization: Bearer <token>
```

**Body:**
```json
{
  "teamId": "clh123456789"
}
```

## ⚽ Partidos

### Obtener todos los partidos
```http
GET /matches
Authorization: Bearer <token>
```

### Obtener partido por ID
```http
GET /matches/{id}
Authorization: Bearer <token>
```

### Crear partido
```http
POST /matches
Authorization: Bearer <token>
```

**Body:**
```json
{
  "tournamentId": "clh123456789",
  "homeTeamId": "clh123456789",
  "awayTeamId": "clh987654321",
  "refereeId": "clh456789123",
  "date": "2024-03-15T20:00:00Z",
  "venue": "Estadio Santiago Bernabéu"
}
```

### Actualizar partido
```http
PUT /matches/{id}
Authorization: Bearer <token>
```

### Eliminar partido
```http
DELETE /matches/{id}
Authorization: Bearer <token>
```

### Actualizar resultado
```http
PATCH /matches/{id}/score
Authorization: Bearer <token>
```

**Body:**
```json
{
  "homeScore": 2,
  "awayScore": 1
}
```

### Agregar estadísticas de jugador
```http
POST /matches/{id}/player-stats
Authorization: Bearer <token>
```

**Body:**
```json
{
  "playerId": "clh123456789",
  "goals": 1,
  "assists": 0,
  "yellowCards": 0,
  "redCards": 0,
  "minutesPlayed": 90,
  "rating": 8.5
}
```

## 📊 Estadísticas

### Obtener estadísticas de jugador
```http
GET /statistics/players/{playerId}
Authorization: Bearer <token>
```

### Obtener estadísticas por temporada
```http
GET /statistics/players/{playerId}/season/{season}
Authorization: Bearer <token>
```

### Obtener estadísticas de equipo
```http
GET /statistics/teams/{teamId}
Authorization: Bearer <token>
```

### Obtener estadísticas de torneo
```http
GET /statistics/tournaments/{tournamentId}
Authorization: Bearer <token>
```

## 💰 Gestión Financiera

### Obtener transacciones financieras
```http
GET /financial
Authorization: Bearer <token>
```

### Crear transacción financiera
```http
POST /financial
Authorization: Bearer <token>
```

**Body:**
```json
{
  "teamId": "clh123456789",
  "type": "SPONSORSHIP",
  "amount": 1000000,
  "currency": "USD",
  "description": "Patrocinio principal",
  "date": "2024-01-15",
  "category": "REVENUE",
  "isIncome": true
}
```

### Obtener balance de equipo
```http
GET /financial/teams/{teamId}/balance
Authorization: Bearer <token>
```

## 🔔 Notificaciones

### Obtener notificaciones del usuario
```http
GET /notifications
Authorization: Bearer <token>
```

### Marcar notificación como leída
```http
PATCH /notifications/{id}/read
Authorization: Bearer <token>
```

### Marcar todas las notificaciones como leídas
```http
PATCH /notifications/read-all
Authorization: Bearer <token>
```

## 🏥 Salud de la API

### Verificar estado de la API
```http
GET /health
```

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600,
  "version": "1.0.0"
}
```

## 📝 Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o faltante |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto de datos |
| 422 | Unprocessable Entity - Datos no procesables |
| 500 | Internal Server Error - Error interno del servidor |

## 🔒 Roles y Permisos

### Roles de Usuario
- **ADMIN**: Acceso completo a todas las funcionalidades
- **MANAGER**: Gestión de equipos y torneos
- **COACH**: Gestión de jugadores y partidos
- **PLAYER**: Acceso limitado a información personal
- **USER**: Acceso básico de lectura

### Permisos por Endpoint

| Endpoint | ADMIN | MANAGER | COACH | PLAYER | USER |
|----------|-------|---------|-------|--------|------|
| GET /users | ✅ | ✅ | ❌ | ❌ | ❌ |
| POST /users | ✅ | ❌ | ❌ | ❌ | ❌ |
| GET /teams | ✅ | ✅ | ✅ | ✅ | ✅ |
| POST /teams | ✅ | ✅ | ❌ | ❌ | ❌ |
| GET /players | ✅ | ✅ | ✅ | ✅ | ✅ |
| POST /players | ✅ | ✅ | ✅ | ❌ | ❌ |
| GET /tournaments | ✅ | ✅ | ✅ | ✅ | ✅ |
| POST /tournaments | ✅ | ✅ | ❌ | ❌ | ❌ |
| GET /matches | ✅ | ✅ | ✅ | ✅ | ✅ |
| POST /matches | ✅ | ✅ | ✅ | ❌ | ❌ |
| GET /financial | ✅ | ✅ | ❌ | ❌ | ❌ |
| POST /financial | ✅ | ✅ | ❌ | ❌ | ❌ |

## 📡 WebSocket Events

### Eventos de Notificaciones
```javascript
// Conectar al WebSocket
const socket = io('http://localhost:3001');

// Escuchar notificaciones
socket.on('notification', (data) => {
  console.log('Nueva notificación:', data);
});

// Escuchar actualizaciones de partidos
socket.on('match_update', (data) => {
  console.log('Actualización de partido:', data);
});

// Escuchar actualizaciones de torneos
socket.on('tournament_update', (data) => {
  console.log('Actualización de torneo:', data);
});
```

## 🚀 Ejemplos de Uso

### Ejemplo: Crear un torneo completo

```javascript
// 1. Crear torneo
const tournament = await fetch('/api/tournaments', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Copa América 2024',
    description: 'Torneo continental',
    startDate: '2024-06-15',
    endDate: '2024-07-15',
    type: 'CUP',
    maxTeams: 16
  })
});

// 2. Agregar equipos
const teams = ['Argentina', 'Brasil', 'Chile', 'Uruguay'];
for (const teamName of teams) {
  const team = await fetch('/api/teams', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: teamName,
      country: 'South America'
    })
  });
  
  // Agregar equipo al torneo
  await fetch(`/api/tournaments/${tournament.id}/teams`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      teamId: team.id
    })
  });
}
```

## 📚 Recursos Adicionales

- [Documentación de Swagger](http://localhost:3001/api/docs)
- [Guía de Desarrollo](./development.md)
- [Arquitectura del Sistema](./architecture.md)
- [Guía de Despliegue](./deployment.md) 