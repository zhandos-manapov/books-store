export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export interface EnvironmentVariables {
  PORT: number
  NODE_ENV: NODE_ENV

  DATABASE_USER: string
  DATABASE_PASSWORD: string
  DATABASE_DB: string
  DATABASE_HOST: string
  DATABASE_PORT: number
}
