import { GeistUIThemes, useTheme } from '@geist-ui/core'
import { CornerUpLeft } from '@geist-ui/icons'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import { $theme } from '~/features/theme'
import { routes } from '~/shared/routes'
import { CustomLink } from '~/shared/ui'
import { SettingsMenu } from './settings-menu'

export const Sidebar = () => {
  const theme = useTheme()
  const type = useStore($theme)
  return (
    <>
      <LeftMenu theme={theme} data-theme={theme.type}>
        <CustomLink className={linkClasses} iconLeft={<CornerUpLeft />} to={routes.workspace}>
          Settings
        </CustomLink>
        <CollapseBar>
          <SettingsMenu theme={type} />
        </CollapseBar>
      </LeftMenu>
    </>
  )
}

const linkClasses = css`
  font-size: 1.2rem;
`

const LeftMenu = styled.aside<{ theme: GeistUIThemes }>`
  padding: 20px 37px 0 37px;
  width: 100%;

  border-right: 1px solid ${({ theme }) => theme.palette.border};
`

const CollapseBar = styled.nav`
  margin-top: 3rem;
`
