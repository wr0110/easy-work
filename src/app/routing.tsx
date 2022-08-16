import { createHistoryRouter } from 'atomic-router'
import { routesMap } from '~/pages'
import { history } from '~/shared/lib/history'

export const router = createHistoryRouter({
  routes: routesMap,
})

router.setHistory(history)
