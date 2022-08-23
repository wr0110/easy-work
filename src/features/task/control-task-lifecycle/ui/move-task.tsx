import { DragOverlay } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { css } from '@linaria/core'
import { useStore, useStoreMap } from 'effector-react'
import { CSSProperties, FC, memo } from 'react'
import { createPortal } from 'react-dom'
import { $tasks } from '~/entities/task'
import { TaskPreview } from '~/entities/task/ui'
import { useLifecycleTasksUnits } from '../context'

export const TaskDraggable: FC<{ taskId: string }> = memo(({ taskId }) => {
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({
    id: taskId,
  })

  const taskMeta = useStoreMap({
    store: $tasks,
    keys: [taskId],
    fn: (tasks, [id]) => tasks[id],
    defaultValue: { title: 'not found', description: 'not found' },
  })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TaskPreview
        key={taskId}
        taskId={taskId}
        title={taskMeta.title}
        description={taskMeta.description}
        labels={taskMeta.labels}
        className={taskPreviewClasses}
      />
    </div>
  )
})

export const Overlay: FC = () => {
  const units = useLifecycleTasksUnits()

  const activeId = useStore(units.$activeItemId)
  const task = useStoreMap({
    store: $tasks,
    keys: [activeId],
    fn: (tasks, [id]) => (id ? tasks[id] : null),
  })
  return createPortal(
    <DragOverlay>
      {task && (
        <TaskPreview
          taskId={activeId!}
          title={task.title}
          description={task.description}
          labels={task.labels}
        />
      )}
    </DragOverlay>,
    document.body
  )
}

const taskPreviewClasses = css`
  margin: 1rem 0 2rem 0 !important;
`
