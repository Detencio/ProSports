import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';

// Módulos de la aplicación
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { MatchesModule } from './matches/matches.module';
import { StatisticsModule } from './statistics/statistics.module';
import { FinancialModule } from './financial/financial.module';
import { NotificationsModule } from './notifications/notifications.module';
import { HealthModule } from './health/health.module';

// Configuración de Prisma
import { PrismaModule } from './prisma/prisma.module';

/**
 * Módulo principal de la aplicación ProSports
 * Configura todos los módulos necesarios para la plataforma de gestión deportiva
 */
@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuración de rate limiting
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.THROTTLE_TTL || '60'),
      limit: parseInt(process.env.THROTTLE_LIMIT || '100'),
    }),

    // Módulo de Prisma para base de datos
    PrismaModule,

    // Módulo de salud para monitoreo
    TerminusModule,
    HealthModule,

    // Módulos de funcionalidad
    AuthModule,
    UsersModule,
    TeamsModule,
    PlayersModule,
    TournamentsModule,
    MatchesModule,
    StatisticsModule,
    FinancialModule,
    NotificationsModule,
  ],
})
export class AppModule {} 