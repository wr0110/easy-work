import { useStore } from 'effector-react'
import { FC } from 'react'
import { $isAuthenticated } from '../../model'

interface Props {
  when: 'authorized' | 'anonymous'
}

export const ShowOnly: FC<Props> = ({ children, when }) => {
  const isAuthenticated = useStore($isAuthenticated)

  const show = (when === 'authorized') === isAuthenticated

  if (show) {
    return <>{children}</>
  }

  return null
}
