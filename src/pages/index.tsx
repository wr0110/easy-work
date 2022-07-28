import { lazy, Suspense } from 'react'

export const Routes = lazy(() =>
  import('./routes-list').then((module) => ({ default: module.Routes }))
)

export const Pages = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes />
    </Suspense>
  )
}
