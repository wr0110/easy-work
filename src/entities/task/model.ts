import { createEvent, createStore } from 'effector'
import { loadTasksFx, Task } from '~/shared/api/requests'

export const updateTaskInfo = createEvent<{ taskID: string }>()

export const $tasks = createStore<Task[]>([]).on(loadTasksFx.doneData, (_, tasks) => tasks)
