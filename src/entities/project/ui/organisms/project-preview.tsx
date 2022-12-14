import { Card, Image, Text, useTheme } from '@geist-ui/core'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Link } from 'atomic-router-react'
import { FC } from 'react'
import type { Project } from '~/shared/api/requests'
import { routes } from '~/shared/routes'

interface Props {
  project: Project
  className?: string
}

export const ProjectPreview: FC<Props> = ({ project, className }) => {
  const { type } = useTheme()

  return (
    <Card className={cardClasses} data-theme={type} width="300px" shadow padding={0}>
      <Link className={className} to={routes.project} params={{ id: project.projectID }}>
        <Image width="300px" height="200px" src={project.photoUrl} alt="project preview" />
        <GroupBody>
          <Text h4 mb={0}>
            {project.title}
          </Text>
          <Text type="secondary" small>
            {project.description}
          </Text>
        </GroupBody>
      </Link>
    </Card>
  )
}

const cardClasses = css`
  & .content {
    padding: 0 !important;
  }

  &[data-theme='dark'] {
    &:hover {
      box-shadow: 0 0 0 1px #fff !important;
    }
  }
`

const GroupBody = styled.div`
  padding: 0 1rem 1rem;
`
