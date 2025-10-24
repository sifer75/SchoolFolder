import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import { WebGuardContract } from '#config/auth'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class GuestMiddleware {
  /**
   * The URL to redirect to when user is logged-in
   */
  redirectTo = '/'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    for (let guardName of options.guards || [ctx.auth.defaultGuard]) {
      const guard = ctx.auth.use(guardName) as WebGuardContract
      // ici même problème que dans le fichier auth.ts, je suis obligé de caster le type WebGuardContract car je n'arrive pas à inférer le type exact retourné par ctx.auth.use(guard)
      if (await guard.check()) {
        return ctx.response.redirect(this.redirectTo, true)
      }
    }

    return next()
  }
}
