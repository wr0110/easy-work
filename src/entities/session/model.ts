import { redirect } from 'atomic-router'
import { createEffect, createEvent, createStore, sample, split } from 'effector'
import { persist } from 'effector-storage/local'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import type { User } from '~/shared/api/requests'
import { setUidForRequest } from '~/shared/api/requests/request'
import { appStarted } from '~/shared/config/run-logic'
import { routes } from '~/shared/routes'

export const logOut = createEvent()
export const sessionChanged = createEvent<FirebaseUser | null>()

export const sessionDeleteFx = createEffect({
  handler: async () => getAuth().signOut(),
})
export const subscribeSessionFx = createEffect({
  handler: async () => onAuthStateChanged(getAuth(), sessionChanged),
})

export const { sessionEstablished, __: sessionFailed } = split(sessionChanged, {
  sessionEstablished: (user): user is FirebaseUser => Boolean(user),
})

export const $currentUser = createStore<User | null>(null).reset(sessionDeleteFx.done)

sample({ clock: appStarted, target: subscribeSessionFx })

// TODO fix later...
sample({
  clock: sessionEstablished,
  fn: (user) => ({
    uid: user.uid,
    fullname: user.displayName ?? 'no name',
    email: user.email ?? '',
    photoUrl: user.photoURL ?? '',
  }),
  target: $currentUser,
})

redirect({
  clock: sessionFailed,
  route: routes.login,
})

sample({ clock: logOut, target: sessionDeleteFx })

sample({ clock: sessionDeleteFx.done, target: routes.login.open })

sample({
  clock: $currentUser,
  filter: Boolean,
  fn: (user) => user.uid,
  target: setUidForRequest,
})

persist({ store: $currentUser, key: 'current-user' })
