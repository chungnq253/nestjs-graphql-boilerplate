import { registerAs } from '@nestjs/config';

export interface AppConfig {
  nodeEnv: string;
  port: number;
  debug: boolean;
  throttleTTL: number;
  throttleLimit: number;
}

export default registerAs('app', (): AppConfig => {
  return {
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT) || 8080,
    debug: process.env.NODE_ENV && process.env.NODE_ENV !== 'production',

    // Rate Limit
    throttleTTL: Number(process.env.THROTTLE_TTL) || 60,
    throttleLimit: Number(process.env.THROTTLE_LIMIT) || 10,
  };
});
