import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, targets } from '@adonisjs/core/logger'

// ici même problème que dans le fichier auth.ts, je suis obligé de caster le type LoggerConfigType car je n'arrive pas à inférer le type exact retourné par loggerConfig, à changer

export type AppLoggerConfig = {
  enabled: true
  name: string | undefined
  level: string
  transport: {
    targets: any[]
  }
}

type LoggerConfigType = {
  default: 'app'
  loggers: {
    app: AppLoggerConfig
  }
}

const loggerConfig: LoggerConfigType = defineConfig({
  default: 'app',

  /**
   * The loggers object can be used to define multiple loggers.
   * By default, we configure only one logger (named "app").
   */
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      transport: {
        targets: targets()
          .pushIf(!app.inProduction, targets.file({ destination: 1 }))
          .pushIf(!app.inProduction, targets.pretty())
          .toArray(),
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
