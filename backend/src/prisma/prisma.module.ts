import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global de Prisma para la gestión de la base de datos
 * Proporciona el servicio PrismaService a toda la aplicación
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {} 