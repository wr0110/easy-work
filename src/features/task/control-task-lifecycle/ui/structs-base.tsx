import { ReactNode } from 'react'
import { LifecycleTasksProvider } from '../context'
import { taskLifecycleState } from '../model'
import { BoardsBase } from './board'

export const LifecycleStructBoards = ({ extra }: { extra?: ReactNode }) => {
  return (
    <>
      <LifecycleTasksProvider value={taskLifecycleState}>
        <BoardsBase extra={extra} />
      </LifecycleTasksProvider>
    </>
  )
}
