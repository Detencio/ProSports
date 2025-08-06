# Guía de Desarrollo - ProSports

## 📋 Introducción

Esta guía establece los estándares y mejores prácticas para el desarrollo de la Plataforma Integral de Gestión Deportiva ProSports.

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
ProSports/
├── backend/                 # API REST con NestJS
│   ├── src/
│   │   ├── auth/           # Autenticación y autorización
│   │   ├── users/          # Gestión de usuarios
│   │   ├── teams/          # Gestión de equipos
│   │   ├── players/        # Gestión de jugadores
│   │   ├── tournaments/    # Gestión de torneos
│   │   ├── matches/        # Gestión de partidos
│   │   ├── statistics/     # Estadísticas y análisis
│   │   ├── financial/      # Gestión financiera
│   │   ├── notifications/  # Sistema de notificaciones
│   │   ├── health/         # Monitoreo de salud
│   │   └── prisma/         # Configuración de base de datos
│   ├── prisma/
│   │   └── schema.prisma   # Esquema de base de datos
│   └── test/               # Tests unitarios y e2e
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios de API
│   │   ├── contexts/       # Contextos de React
│   │   ├── types/          # Tipos TypeScript
│   │   ├── utils/          # Utilidades
│   │   └── theme/          # Configuración de tema
│   └── public/             # Archivos estáticos
└── docs/                   # Documentación
```

## 🛠️ Configuración del Entorno de Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Docker y Docker Compose
- PostgreSQL 14+
- Redis 6+

### Configuración Inicial

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/prosports.git
cd prosports
```

2. **Configurar variables de entorno**
```bash
# Backend
cp backend/env.example backend/.env
# Editar backend/.env con tus configuraciones

# Frontend
cp frontend/env.example frontend/.env
# Editar frontend/.env con tus configuraciones
```

3. **Instalar dependencias**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. **Configurar base de datos**
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## 📝 Estándares de Código

### Backend (NestJS + TypeScript)

#### Estructura de Módulos

```typescript
// users/users.module.ts
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

#### Estructura de Servicios

```typescript
// users/users.service.ts
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { isActive: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
```

#### Estructura de Controladores

```typescript
// users/users.controller.ts
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
```

#### DTOs (Data Transfer Objects)

```typescript
// users/dto/create-user.dto.ts
import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Rol del usuario', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
```

### Frontend (React + TypeScript)

#### Estructura de Componentes

```typescript
// components/UserCard.tsx
import React from 'react';
import { Box, Text, Avatar, Badge } from '@chakra-ui/react';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      _hover={onClick ? { shadow: 'md' } : {}}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} mr={3} />
        <Box>
          <Text fontWeight="bold">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {user.email}
          </Text>
        </Box>
      </Box>
      <Badge colorScheme="blue">{user.role}</Badge>
    </Box>
  );
};
```

#### Custom Hooks

```typescript
// hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
```

#### Servicios de API

```typescript
// services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 🧪 Testing

### Backend Testing

#### Tests Unitarios

```typescript
// users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: '1', email: 'test@example.com' }];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
```

#### Tests E2E

```typescript
// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });
});
```

### Frontend Testing

```typescript
// components/__tests__/UserCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { UserCard } from '../UserCard';

const mockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'USER',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(
      <ChakraProvider>
        <UserCard user={mockUser} />
      </ChakraProvider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
  });
});
```

## 🔧 Herramientas de Desarrollo

### ESLint y Prettier

```json
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

### Husky (Git Hooks)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 📦 Scripts de Desarrollo

### Backend

```json
{
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "build": "nest build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\""
  }
}
```

### Frontend

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,js,jsx,json,css,md}"
  }
}
```

## 🚀 Flujo de Desarrollo

### 1. Crear una nueva feature

```bash
# Crear rama para la feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios en el código
# ...

# Commit con mensaje descriptivo
git commit -m "feat: agregar funcionalidad de estadísticas avanzadas

- Agregar gráficos de rendimiento por jugador
- Implementar filtros por temporada
- Añadir exportación de datos a CSV"
```

### 2. Testing

```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Frontend
cd frontend
npm run test
```

### 3. Linting y Formateo

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
npm run format
```

### 4. Pull Request

1. Push de la rama
2. Crear Pull Request en GitHub
3. Revisión de código
4. Merge después de aprobación

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de React](https://reactjs.org/docs/)
- [Documentación de Chakra UI](https://chakra-ui.com/docs)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/) 