import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private prisma = new PrismaClient();

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Verificar status geral da aplicação' })
  @ApiResponse({ status: 200, description: 'Status da aplicação' })
  @HealthCheck()
  check() {
    return this.health.check([
      // Verificar se as APIs externas estão funcionando
      () =>
        this.http.pingCheck(
          'brazilian-api',
          'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider',
        ),
      () =>
        this.http.pingCheck(
          'european-api',
          'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider',
        ),
      // Verificar conexão com banco de dados
      () => this.prismaHealth.pingCheck('database', this.prisma),
    ]);
  }

  @Get('simple')
  @ApiOperation({ summary: 'Health check simples da api' })
  @ApiResponse({ status: 200, description: 'Status básico da aplicação' })
  simpleHealthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total:
          Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
      },
    };
  }
}
