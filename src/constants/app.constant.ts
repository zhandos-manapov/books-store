export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export interface EnvironmentVariables {
  PORT: number
  NODE_ENV: NODE_ENV

  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  POSTGRES_HOST: string
  POSTGRES_PORT: number
}
