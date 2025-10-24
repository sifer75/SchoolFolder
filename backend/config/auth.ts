import User from '#models/user'
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { LucidAuthenticatable } from '@adonisjs/auth/types/session'

type AuthConfigType = ReturnType<typeof defineConfig>

export type WebGuardContract = {
  user: LucidAuthenticatable | null
  isLoggedIn: boolean
  login(user: LucidAuthenticatable): Promise<void>
  logout(): Promise<void>
  check(): Promise<boolean>
  authenticate(): Promise<void>
  attempt(uid: string, password: string): Promise<void>
  rememberMeToken?: string | null
  // ajoute ici les méthodes que tu utilises, à changer mauvaise méthode
  // je dois pouvoir appeler les types du Authentificator mais le problème est qu'adonis n'exporte pas le type
}

const authConfig: AuthConfigType = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => Promise.resolve({ default: User as unknown as LucidAuthenticatable }),
      }),
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators {
    web: WebGuardContract
  }
}

declare module '@adonisjs/core/types' {
  interface EventsList {}
}
