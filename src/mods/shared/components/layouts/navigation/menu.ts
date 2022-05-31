import {
  ClipboardListIcon,
  CollectionIcon,
  DocumentIcon,
  FolderIcon,
  KeyIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline'

export const menu = [
  { name: 'Overview', href: '/project-overview', icon: FolderIcon },
  { name: 'Applications', href: '/apps', icon: CollectionIcon },
  {
    name: 'SIP Network',
    menu: [
      { name: 'Trunks', href: '/network/providers' },
      { name: 'Numbers', href: '/network/numbers' },
      { name: 'Domains', href: '/network/domains' },
      { name: 'Agents', href: '/network/agents' },
    ],
    icon: PhoneIcon,
  },
  { name: 'Secrets', href: '/secrets', icon: KeyIcon },
  {
    name: 'Monitoring',
    menu: [
      { name: 'SIP Logs', href: '/monitor/sip' },
      { name: 'Call Logs', href: '/monitor/call' },
      { name: 'App Logs', href: '/monitor/app' },
    ],
    icon: ClipboardListIcon,
  },
  {
    name: 'Marketplace',
    href: 'https://marketplace.fonoster.com',
    icon: ShoppingBagIcon,
    target: '_blank',
  },
  {
    name: 'Learning',
    href: 'https://marketplace.fonoster.com',
    icon: DocumentIcon,
    target: '_blank',
  },
]