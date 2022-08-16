import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { not } from 'patronum'
import { $currentUser } from './model'

export const $isAuthenticated = $currentUser.map(Boolean)

export const authorizedChain = <Params>(route: RouteInstance<Params>) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    filter: $isAuthenticated,
  })

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAuthorized,
  })
}

export const anonymousChain = <Params>(route: RouteInstance<Params>) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    filter: not($isAuthenticated),
  })

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAnonymous,
  })
}
