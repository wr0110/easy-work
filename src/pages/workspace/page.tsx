import { reflect } from '@effector/reflect'
import { Grid, Tabs, Text } from '@geist-ui/core'
import { $activeProjects, $finishedProjects } from '~/entities/project'
import { ProjectList } from '~/entities/project/ui'
import { $favoritesProjects } from '~/features/project/favorite'
import { Header } from '~/widgets/header'
import { UserSettings } from '~/widgets/settings/menu-settings'
import { $pending } from './model'

export const Workspace = () => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={24} height="80px">
        <Header settings={<UserSettings />} />
      </Grid>
      <Grid xs={20} height="63px">
        <Text h3>Your works</Text>
      </Grid>
      <Grid xs={20} style={{ position: 'relative' }}>
        <ActiveProjects />
      </Grid>
      <Grid xs={20}>
        <Tabs initialValue="1" width="100%">
          <Tabs.Item label="Finished" value="1">
            <FinishedProjects />
          </Tabs.Item>
          <Tabs.Item label="important" value="3">
            <FavoritesProjects />
          </Tabs.Item>
        </Tabs>
      </Grid>
    </Grid.Container>
  )
}

const ActiveProjects = reflect({
  view: ProjectList,
  bind: {
    projects: $activeProjects,
    loading: $pending,
  },
})

const FavoritesProjects = reflect({
  view: ProjectList,
  bind: {
    projects: $favoritesProjects,
    loading: $pending,
  },
})

const FinishedProjects = reflect({
  view: ProjectList,
  bind: {
    projects: $finishedProjects,
    loading: $pending,
  },
})
