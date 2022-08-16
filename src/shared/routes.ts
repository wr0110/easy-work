import { createRoute } from 'atomic-router'

export const routes = {
  workspace: createRoute(),
  project: createRoute<{ id: string }>(),
  login: createRoute(),
  user: {
    edit: createRoute(),
  },
  errors: {
    notFound: createRoute(),
  },
}
