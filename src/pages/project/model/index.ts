import { sample } from 'effector'
import { pending } from 'patronum'
import { anonymousChain, authorizedChain } from '~/entities/session/hooks'
import {
  addTaskFx,
  addTaskToLifecycleFx,
  loadFavoritesProjectsFx,
  loadTasksFx,
  loadTasksLifecycleFx,
  Status,
} from '~/shared/api/requests'
import { routes } from '~/shared/routes'

export const $pending = pending({ effects: [loadTasksLifecycleFx] })

export const anonymousRoute = anonymousChain(routes.project)
export const authenticatedRoute = authorizedChain(routes.project)

sample({
  clock: authenticatedRoute.opened,
  filter: authenticatedRoute.$isOpened,
  fn: (route) => ({ projectID: route.params.id }),
  target: [loadTasksLifecycleFx, loadTasksFx, loadFavoritesProjectsFx],
})

sample({
  clock: addTaskFx.doneData,
  source: authenticatedRoute.$params,
  filter: Boolean,
  fn: (params, taskId) => ({ projectID: params.id, status: 'idle' as Status, taskId }),
  target: addTaskToLifecycleFx,
})

sample({ clock: anonymousRoute.opened, target: routes.login.open })
