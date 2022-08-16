import { Button, Text } from '@geist-ui/core'
import { LogOut } from '@geist-ui/icons'
import { css } from '@linaria/core'
import { createEvent, sample } from 'effector'
import { logOut } from '../../model'

export const logoutClicked = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>()

sample({ clock: logoutClicked, target: logOut })

export const Logout = () => {
  return (
    <Button type="abort" icon={<LogOut />} onClick={logoutClicked} className={linkClasses}>
      <Text span data-element="text">
        Sign out
      </Text>
    </Button>
  )
}

const linkClasses = css`
  cursor: pointer;

  display: flex;
  align-items: center;

  max-width: 100%;
  max-height: 100%;

  padding-left: 6px;
  width: 100%;
  height: 2.8rem;

  background-color: transparent;
  border: none;

  border-radius: 0.3rem;

  & > [data-element='text'] {
    margin-left: 1.3rem;
  }
`
