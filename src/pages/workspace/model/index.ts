import { sample } from 'effector'
import { every } from 'patronum'
import { redirectSessionFailure, checkAuthenticated } from '~/entities/session'
import { loadFavoritesProjectsFx, loadProjectsFx } from '~/shared/api/requests'
import { routes } from '~/shared/routes'

checkAuthenticated({
  when: routes.workspace.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

export const $pending = every({
  stores: [loadProjectsFx.pending, loadFavoritesProjectsFx.pending],
  predicate: true,
})

sample({
  clock: routes.workspace.opened,
  filter: routes.workspace.$isOpened,
  target: [loadProjectsFx, loadFavoritesProjectsFx],
})
