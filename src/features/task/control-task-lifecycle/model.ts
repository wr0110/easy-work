import { sample } from 'effector'
import { addTaskToLifecycleFx, loadTasksLifecycleFx, removeTaskFx } from '~/shared/api/requests'
import { createTaskLifeCycleState } from './lib'

export const taskLifecycleState = createTaskLifeCycleState()

sample({ clock: loadTasksLifecycleFx.doneData, target: taskLifecycleState.initItems })

sample({ clock: addTaskToLifecycleFx.doneData, target: taskLifecycleState.addItems })

sample({
  clock: removeTaskFx.done,
  fn: ({ params }) => ({ taskId: params.taskId }),
  target: taskLifecycleState.removeItem,
})
