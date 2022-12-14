import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { attach, combine, createEvent, createStore, sample } from 'effector'
import { splitMap } from 'patronum'
import type { Status, TaskLifecycle } from '~/shared/api/requests'
import { isDefined } from '~/shared/lib/type-guard'

export const changeTaskStatus = (
  tasks: TaskLifecycle[],
  id: string,
  status: Status
): TaskLifecycle[] => {
  return tasks.map((task) => (task.taskId === id ? { ...task, status } : task))
}

export const notPositionRepeat = (activeId: string, overId: string) => activeId !== overId

export const findBoardStatus = (tasks: TaskLifecycle[], id: string) => {
  return tasks.find((task) => task.taskId === id)?.status
}

export type ID = Pick<TaskLifecycle, 'taskId'>

export const createTaskLifeCycleState = () => {
  const addItems = createEvent<TaskLifecycle>()
  const initItems = createEvent<TaskLifecycle[]>()
  const removeItem = createEvent<ID>()

  const $lifecycle = createStore<TaskLifecycle[]>([])
    .on(initItems, (_, tasks) => tasks)
    .on(addItems, (prevTasks, tasks) => prevTasks.concat(tasks))
    .on(removeItem, (tasks, { taskId }) => tasks.filter((task) => task.taskId !== taskId))

  const $idle = createStore<TaskLifecycle[]>([]).on($lifecycle, (_, tasks) =>
    tasks.filter((task) => task.status === 'idle')
  )

  const $inProcessing = createStore<TaskLifecycle[]>([]).on($lifecycle, (_, tasks) =>
    tasks.filter((task) => task.status === 'take')
  )

  const $completed = createStore<TaskLifecycle[]>([]).on($lifecycle, (_, tasks) =>
    tasks.filter((task) => task.status === 'resolve')
  )

  const $taskLifecycle = combine({
    idle: $idle,
    take: $inProcessing,
    resolve: $completed,
  })

  const takeTaskFx = attach({
    source: $lifecycle,
    effect: (lifecycle, { taskId }: ID) => {
      return changeTaskStatus(lifecycle, taskId, 'take')
    },
  })

  const resolveTaskFx = attach({
    source: $lifecycle,
    effect: (lifecycle, { taskId }: ID) => {
      return changeTaskStatus(lifecycle, taskId, 'resolve')
    },
  })

  interface MoveTask {
    fromRaisedId: string
    overElement: string
  }

  const taskDragEndedFx = attach({
    source: $lifecycle,
    effect: (lifecycle, { fromRaisedId, overElement }: MoveTask) => {
      const fromRaisedTask = lifecycle.find((task) => task.taskId === fromRaisedId)
      const isTask = lifecycle.some((task) => task.taskId === overElement)

      if (!fromRaisedTask) throw new Error(`${fromRaisedId} not provided in ${lifecycle}`)

      return {
        fromRaisedTask,
        targetBoard: isTask ? findBoardStatus(lifecycle, overElement) : overElement,
      }
    },
  })

  const { take, resolve } = splitMap({
    source: taskDragEndedFx.doneData,
    cases: {
      take: ({ fromRaisedTask, targetBoard }) => {
        if (fromRaisedTask.status === 'idle' && targetBoard === 'take') {
          return { taskId: fromRaisedTask.taskId } as ID
        }
      },
      resolve: ({ fromRaisedTask, targetBoard }) => {
        if (fromRaisedTask.status === 'take' && targetBoard === 'resolve') {
          return { taskId: fromRaisedTask.taskId } as ID
        }
      },
    },
  })

  sample({
    clock: take,
    target: takeTaskFx,
  })

  sample({
    source: resolve,
    target: resolveTaskFx,
  })

  sample({
    clock: [takeTaskFx.doneData, resolveTaskFx.doneData],
    target: $lifecycle,
  })

  const dragStarted = createEvent<DragStartEvent>()
  const dragOver = createEvent<DragOverEvent>()
  const dragEnded = createEvent<DragEndEvent>()

  const $activeItemId = createStore<string | null>(null).reset(dragEnded)

  sample({
    clock: dragStarted,
    fn: (e) => e.active.id,
    target: $activeItemId,
  })

  sample({
    clock: dragEnded,
    filter: ({ active, over }) => isDefined(over) && notPositionRepeat(over.id, active.id),
    fn: ({ active, over }) => ({
      fromRaisedId: active.id,
      overElement: over?.id as string,
    }),
    target: taskDragEndedFx,
  })

  return {
    addItems,
    initItems,
    dragEnded,
    dragOver,
    removeItem,
    dragStarted,
    $taskLifecycle,
    $activeItemId,
  }
}
