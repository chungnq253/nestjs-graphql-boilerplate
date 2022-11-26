import { Controller, Get, Injectable } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { HealthIndicatorResult, HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class AppHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    return this.getStatus('app', true);
  }
}

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    const appHealthIndicator = new AppHealthIndicator();
    return this.health.check([async () => appHealthIndicator.isHealthy()]);
  }
}
