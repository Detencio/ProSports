import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Servicio de autenticación
 * Maneja el login, registro y validación de tokens JWT
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales de un usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Usuario si las credenciales son válidas
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  /**
   * Realiza el login de un usuario
   * @param loginDto Datos de login
   * @returns Token JWT y datos del usuario
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * Registra un nuevo usuario
   * @param createUserDto Datos del usuario a crear
   * @returns Usuario creado y token JWT
   */
  async register(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(
      createUserDto.password, 
      parseInt(process.env.BCRYPT_ROUNDS || '12')
    );

    // Crear usuario
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Generar token JWT
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * Refresca el token JWT
   * @param userId ID del usuario
   * @returns Nuevo token JWT
   */
  async refreshToken(userId: string) {
    const user = await this.usersService.findById(userId);
    
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Usuario no válido');
    }

    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Verifica un token JWT
   * @param token Token JWT a verificar
   * @returns Payload del token si es válido
   */
  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
} 