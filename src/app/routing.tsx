import { createHistoryRouter } from 'atomic-router'
import { sample } from 'effector'
import { redirectSessionFailure } from '~/entities/session'
import { notFoundRoute } from '~/pages/error-not-found/route'
import { loginRoute } from '~/pages/login/route'
import { routes } from '~/pages/routes-list'
import { history } from '~/shared/lib/routing-history'

export const router = createHistoryRouter({
  routes,
})

router.setHistory(history)

sample({
  clock: redirectSessionFailure,
  fn: () => ({}),
  target: loginRoute.open,
})

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: notFoundRoute.open,
})
