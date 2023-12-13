import {ROLES} from '../roles'

const SideNavData = [
  {
    title: 'HOME',
    path: '/home',
    permission: [ROLES.ADMIN, ROLES.USER]
  },
  {
    title: 'PRODUCT',
    path: '/product',
    permission: [ROLES.ADMIN, ROLES.USER]
  }
]

export {SideNavData}
