import { sample } from 'effector'
import { every } from 'patronum'
import { anonymousChain, authorizedChain } from '~/entities/session/hooks'
import { loadFavoritesProjectsFx, loadProjectsFx } from '~/shared/api/requests'
import { routes } from '~/shared/routes'

export const anonymousRoute = anonymousChain(routes.workspace)
export const authenticatedRoute = authorizedChain(routes.workspace)

export const $pending = every({
  stores: [loadProjectsFx.pending, loadFavoritesProjectsFx.pending],
  predicate: true,
})

sample({
  clock: routes.workspace.opened,
  filter: routes.workspace.$isOpened,
  target: [loadProjectsFx, loadFavoritesProjectsFx],
})

sample({ clock: anonymousRoute.opened, target: routes.login.open })
