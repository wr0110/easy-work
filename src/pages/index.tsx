import { Route } from 'atomic-router-react'
import { routes } from '~/shared/routes'
import { NotFound } from './error-not-found/page'
import { Login } from './login/page'
import { Project } from './project/page'
import { Settings } from './settings/profile/page'
import { Workspace } from './workspace/page'

export const Pages = () => {
  return (
    <>
      <Route route={routes.workspace} view={Workspace} />
      <Route route={routes.login} view={Login} />
      <Route route={routes.user.edit} view={Settings} />
      <Route route={routes.project} view={Project} />
      <Route route={routes.errors.notFound} view={NotFound} />
    </>
  )
}

export const routesMap = [
  { path: '/u/settings/viewer-edit', route: routes.user.edit },
  { path: '/project/:id', route: routes.project },
  { path: '/workspace', route: routes.workspace },
  { path: '/login', route: routes.login },
  { path: '/error-404', route: routes.errors.notFound },
]

export const notFoundRoute = routes.errors.notFound
