import { createHistoryRouter } from 'atomic-router'
import { sample } from 'effector'
import { notFoundRoute, routesMap } from '~/pages'
import { history } from '~/shared/lib/history'

export const router = createHistoryRouter({
  routes: routesMap,
})

router.setHistory(history)

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: notFoundRoute.open,
})
