import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Servicio de Prisma para la gestión de la base de datos
 * Maneja la conexión, migraciones y cierre de la conexión
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  /**
   * Inicializa la conexión a la base de datos cuando el módulo se inicia
   */
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Conexión a la base de datos establecida');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
      throw error;
    }
  }

  /**
   * Cierra la conexión a la base de datos cuando el módulo se destruye
   */
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('🔌 Conexión a la base de datos cerrada');
    } catch (error) {
      console.error('❌ Error al cerrar la conexión con la base de datos:', error);
    }
  }

  /**
   * Ejecuta una transacción de base de datos
   * @param fn Función a ejecutar dentro de la transacción
   * @returns Resultado de la transacción
   */
  async transaction<T>(fn: (prisma: PrismaService) => Promise<T>): Promise<T> {
    return this.$transaction(fn);
  }

  /**
   * Limpia la base de datos (solo para testing)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'test') {
      const tablenames = await this.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

      const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ');

      try {
        await this.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
} 