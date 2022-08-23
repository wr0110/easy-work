import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Grid, Spacer } from '@geist-ui/core'
import { css } from '@linaria/core'
import { useStore } from 'effector-react'
import { FC, memo, ReactNode } from 'react'
import { Status, TaskLifecycle } from '~/shared/api/requests'
import { PanelBoard } from '~/shared/ui'
import { useLifecycleTasksUnits } from '../context'
import { Overlay, TaskDraggable } from './move-task'

export interface LifecycleBoardsProps {
  extra?: ReactNode
}

const arrifyTasksId = (tasks: TaskLifecycle[]) => tasks.map((task) => task.taskId)

export const BoardsBase: FC<LifecycleBoardsProps> = ({ extra }) => {
  const units = useLifecycleTasksUnits()

  const boards = useStore(units.$taskLifecycle)
  // I'll wrap with useUnit for tests it up later
  const dragStarted = units.dragStarted
  const dragOver = units.dragOver
  const dragEnd = units.dragEnded

  const touchSensor = useSensor(TouchSensor)
  // @remark https://github.com/clauderic/dnd-kit/issues/355
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      tolerance: 0,
      delay: 150,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <Grid.Container className={container} gap={4} width="100%" wrap="nowrap">
      <DndContext
        sensors={sensors}
        onDragStart={dragStarted}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        collisionDetection={closestCenter}
      >
        {Object.entries(boards).map(([board, tasks]) => (
          <Grid key={board} sm={6} className={column}>
            <Board amount={boards[board as Status].length} title={board} extra={extra}>
              <SortableContext items={arrifyTasksId(tasks)} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                  <TaskDraggable key={task.taskId} taskId={task.taskId} />
                ))}
              </SortableContext>
            </Board>
          </Grid>
        ))}
        <Overlay />
      </DndContext>
    </Grid.Container>
  )
}

const container = css`
  overflow: auto;
  padding: 24px 0 0 29px;
  min-height: 100vh;

  @media (min-width: 1023px) {
    justify-content: center;
  }
`

const column = css`
  min-width: 347px;
`

export const Board: FC<{ title: string; extra: ReactNode; amount: number }> = memo(
  ({ title, extra, children, amount }) => {
    const { setNodeRef } = useDroppable({ id: title })
    return (
      <div ref={setNodeRef} style={{ width: '100%' }}>
        <PanelBoard heading={title} amount={amount}>
          {extra}
        </PanelBoard>
        <Spacer h={0.3} />
        {children}
      </div>
    )
  }
)
