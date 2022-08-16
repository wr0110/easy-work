import { Monitor, User } from '@geist-ui/icons'

export const menuSettings = [
  {
    label: 'Account',
    icon: (
      <>
        <User size={23} />
      </>
    ),
    items: [
      { name: 'Preferences', href: 'not/implemented' },
      { name: 'Notifications', href: 'not-implemented' },
    ],
  },
  {
    label: 'Workspace',
    icon: (
      <>
        <Monitor size={23} />
      </>
    ),
    items: [
      { name: 'Labels', href: 'not-implemented' },
      { name: 'Topic', href: 'not-implemented' },
      { name: 'Keyboard bind', href: 'not-implemented' },
      { name: 'Features', href: 'not-implemented' },
    ],
  },
]
