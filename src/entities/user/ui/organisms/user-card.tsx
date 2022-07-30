import { Avatar } from '@geist-ui/core'
import { css } from '@linaria/core'
import { FC } from 'react'
import type { User } from '~/shared/api/requests'

interface Props {
  className?: string
  user: User | null
}

export const UserCard: FC<Props> = ({ user, className }) => {
  if (!user) {
    return (
      <Avatar
        isSquare
        text="NN"
        className={`${avatarClasses} ${className}`}
        width={1.38}
        height={1.38}
      />
    )
  }

  const fallback = user.fullname.charAt(0).toUpperCase()
  return (
    <Avatar
      isSquare
      text={fallback}
      width={1.38}
      height={1.38}
      className={`${avatarClasses} ${className}`}
      src={user.photoUrl}
    />
  )
}

const avatarClasses = css`
  cursor: pointer;
`
