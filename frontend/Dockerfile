# Etapa de desarrollo
FROM node:18-alpine AS development

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "start"]

# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS production

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos construidos
COPY --from=build /app/build /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Comando para producción
CMD ["nginx", "-g", "daemon off;"] 