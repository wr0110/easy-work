export type Devises = Record<keyof typeof devises, number>

export const devises = {
  mobile: 650,
  tablet: 900,
  laptop: 1280,
  desktop: 1920,
}

const createBreakpointsMedia = <T extends Devises, U extends keyof T>(devises: T) => {
  const arrifyDevices = Object.entries(devises)

  type MediaScreenQuery = Record<U, string>

  return arrifyDevices.reduce<MediaScreenQuery>((mediaQuery, device) => {
    const [type, size] = device

    mediaQuery[type as U] = `@media screen and (max-width: ${size - 1}px)`

    return mediaQuery
  }, {} as MediaScreenQuery)
}

export const breakpoints = createBreakpointsMedia(devises)
