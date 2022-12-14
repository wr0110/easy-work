import { ToastInput, useToasts } from '@geist-ui/core'
import { attach, createEvent, createStore, sample, Unit } from 'effector'
import { useLayoutEffect } from 'react'

type Toaster = (toast: ToastInput) => void

const saveHandle = createEvent<Toaster>()
const $handler = createStore<Toaster>(() => {
  throw new Error('[toaster] handler not provided')
}).on(saveHandle, (_, handler) => handler)

export const ToastProvider = () => {
  const { setToast } = useToasts()

  useLayoutEffect(() => {
    saveHandle(setToast)
  }, [setToast])

  return null
}

export const showToastFx = attach({
  source: $handler,
  effect: (toaster, toast) => toaster(toast),
})

export const showMessage = <T>(config: { when: Unit<T>; toast: (settings: T) => ToastInput }) => {
  return sample({
    clock: config.when,
    fn: config.toast,
    target: showToastFx,
  })
}
