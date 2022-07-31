import { Route } from 'atomic-router-react'
import { routes } from './routes-list'

export const Pages = () => {
  return (
    <>
      {routes.map((config, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Route key={idx} route={config.route} view={config.view} />
      ))}
    </>
  )
}
