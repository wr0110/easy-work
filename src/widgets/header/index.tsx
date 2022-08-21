import { Grid, Popover, Text, useTheme } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import { FC, ReactNode } from 'react'
import { $isOpenDraftProject, hideCreationForm } from '~/entities/project'
import { CreateProject, ProjectCreationForm } from '~/entities/project/ui'
import { $currentUser } from '~/entities/session'
import { UserCard } from '~/entities/user/ui'
import { SearchBar } from '~/features/search-bar/ui'

interface Props {
  settings: ReactNode
}

export const Header: FC<Props> = ({ settings }) => {
  const isOpen = useStore($isOpenDraftProject)
  const theme = useTheme()
  const user = useStore($currentUser)
  return (
    <HeaderContainer data-theme={theme.type}>
      <Grid.Container justify="center" alignItems="center">
        <Grid xs={9} sm={8} md={10}>
          <Text h2>Mirio</Text>
        </Grid>
        <Grid xs={13} sm={12} md={10} alignItems="center" justify="flex-end">
          <CreateProject />
          <SearchBar />
          <Popover content={settings} disableItemsAutoClose hideArrow>
            <UserCard user={user} />
          </Popover>
        </Grid>
      </Grid.Container>
      <ProjectCreationForm visible={isOpen} close={hideCreationForm} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;

  &[data-theme='light'] {
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  }

  &[data-theme='dark'] {
    box-shadow: 0 0 0 1px #333;
  }
`
