import { userEditRoute } from '~/features/user/edit'
import { paths } from '~/shared/lib/paths'
import { NotFound } from './error-not-found/page'
import { notFoundRoute } from './error-not-found/route'
import { Login } from './login/page'
import { loginRoute } from './login/route'
import { Project } from './project/page'
import { projectRoute } from './project/route'
import { Settings } from './settings/profile/page'
import { Workspace } from './workspace/page'
import { workspaceRoute } from './workspace/route'

export const routes = [
  { path: paths.workspace(), route: workspaceRoute, view: Workspace },
  { path: paths.project(':id'), route: projectRoute, view: Project },
  { path: paths.login(), route: loginRoute, view: Login },
  { path: paths.notFound(), route: notFoundRoute, view: NotFound },
  { path: paths.userEdit(), route: userEditRoute, view: Settings },
]
