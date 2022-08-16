import { sample } from 'effector'
import { pending } from 'patronum'
import { checkAuthenticated, redirectSessionFailure } from '~/entities/session'
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

checkAuthenticated({
  when: routes.project.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

sample({
  clock: routes.project.opened,
  filter: routes.project.$isOpened,
  fn: (route) => ({ projectID: route.params.id }),
  target: [loadTasksLifecycleFx, loadTasksFx, loadFavoritesProjectsFx],
})

sample({
  clock: addTaskFx.doneData,
  source: routes.project.$params,
  filter: Boolean,
  fn: (params, taskId) => ({ projectID: params.id, status: 'idle' as Status, taskId }),
  target: addTaskToLifecycleFx,
})
