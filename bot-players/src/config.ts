'use strict';

import { get } from 'env-var';
import { Level, levels } from 'pino';
import { ImageType } from './api';

export type ApplicationConfig = {
  NODE_ENV: 'dev'|'prod'
  LOG_LEVEL: Level
  HTTP_PORT: number
  GAME_SERVER_URL: string
  GAME_IMAGE_TYPE?: ImageType
  CLOSE_WITH_GRACE_DELAY: number
  NODE_TLS_REJECT_UNAUTHORIZED: boolean
}

const config: ApplicationConfig = {
  NODE_ENV: get('NODE_ENV').default('dev').asEnum(['dev', 'prod']),
  LOG_LEVEL: get('LOG_LEVEL').default('info').asEnum<Level>(Object.keys(levels.values) as  Level[]),
  HTTP_PORT: get('HTTP_PORT').default(8080).asPortNumber(),
  GAME_SERVER_URL: get('GAME_SERVER_URL').required().asUrlString(),
  GAME_IMAGE_TYPE: get('GAME_IMAGE_TYPE').asEnum(['jpeg', 'png']),
  CLOSE_WITH_GRACE_DELAY: get('CLOSE_WITH_GRACE_DELAY').default(5000).asIntPositive(),
  NODE_TLS_REJECT_UNAUTHORIZED: get('NODE_TLS_REJECT_UNAUTHORIZED').default('false').asBool()
};

export default config;