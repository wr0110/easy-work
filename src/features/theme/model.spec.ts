import { allSettled, fork } from 'effector'
import { $theme, themeChoice, themeToggled } from '.'

describe('theme', () => {
  it('toggle theme', async () => {
    const scope = fork({
      values: new Map().set($theme, 'dark'),
    })

    expect(scope.getState($theme)).toBe('dark')

    await allSettled(themeToggled, {
      scope,
    })

    expect(scope.getState($theme)).toBe('light')
  })

  it('choice theme', async () => {
    const scope = fork()

    expect(scope.getState($theme)).toBe('light')

    await allSettled(themeChoice, {
      params: 'dark',
      scope,
    })

    expect(scope.getState($theme)).toBe('dark')
  })
})
