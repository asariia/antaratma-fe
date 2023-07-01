// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

// {
//   title: 'Second Page',
//   path: '/second-page',
//   action: 'read',
//   subject: 'second-page',
//   icon: 'mdi:email-outline',
// },
// {
//   path: '/acl',
//   action: 'read',
//   subject: 'acl-page',
//   title: 'Access Control',
//   icon: 'mdi:shield-outline',
// },
const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    action: 'read',
    subject: 'home',
    icon: 'mdi:home-outline',
  },
  {
    path: '/pameran',
    action: 'read',
    subject: 'pameran',
    title: 'Pameran',
    icon: 'mdi:camera-outline',
  },
  {
    path: '/artikel',
    action: 'read',
    subject: 'artikel',
    title: 'Artikel',
    icon: 'mdi:post',
  },
  {
    path: '/about',
    action: 'read',
    subject: 'about',
    title: 'Tentang Kami',
    icon: 'mdi:info-outline',
  },
]

export default navigation
