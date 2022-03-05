import { Text, useTheme, Link } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'
import { ThemeChoice } from '~/features/theme/ui'

export const Login = () => {
  const theme = useTheme()
  return (
    <>
      <Header data-theme={theme.type}>
        <Container>
          <Text h2>Mirio</Text>
          <div>
            <Link mr={1.2}>Contact</Link>
            <Link mr={1.2}>Sign Up</Link>
            <ThemeChoice />
          </div>
        </Container>
      </Header>
    </>
  )
}

const Header = styled.header`
  width: 100%;
  height: 4rem;

  &[data-theme='light'] {
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  &[data-theme='dark'] {
    box-shadow: 0 0 0 1px #333;
  }
`

const Container = styled.div`
  max-width: 1048px;
  margin: 0 auto;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
