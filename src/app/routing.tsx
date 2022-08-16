import { createHistoryRouter } from 'atomic-router'
import { notFoundRoute, routesMap } from '~/pages'
import { history } from '~/shared/lib/history'

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute,
})

router.setHistory(history)
