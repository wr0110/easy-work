import { Input, KeyCode, KeyMod, useKeyboard, useMediaQuery } from '@geist-ui/core/esm'
import { Search } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useLayoutEffect, useRef } from 'react'
import { addFieldRef, focusSearchField } from '../..'

export const SearchBar = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLInputElement>(null)
  const isDownMd = useMediaQuery('md', { match: 'down' })

  useLayoutEffect(() => {
    addFieldRef(ref)
  }, [])

  useKeyboard(() => {
    focusSearchField()
  }, [KeyMod.CtrlCmd, KeyCode.KEY_K])

  if (isDownMd) {
    return (
      <Spacer>
        <Search size={25} />
      </Spacer>
    )
  }

  return (
    <>
      <Input
        scale={1.2}
        ref={ref}
        mr={1.2}
        clearable
        className={className}
        icon={<Search />}
        placeholder="Search..."
      />
    </>
  )
}

const Spacer = styled.div`
  margin-right: 1rem;
`
