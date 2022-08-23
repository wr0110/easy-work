import { createContext, useContext } from 'react'
import { createTaskLifeCycleState } from './lib'

type LifecycleTasks = ReturnType<typeof createTaskLifeCycleState>

const lifecycleContext = createContext<LifecycleTasks | null>(null)

export const useLifecycleTasksUnits = () => {
  const units = useContext(lifecycleContext)

  if (!units) {
    throw new Error('lifecycle tasks not provided')
  }

  return units
}

export const LifecycleTasksProvider = lifecycleContext.Provider
