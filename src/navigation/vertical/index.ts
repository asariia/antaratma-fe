// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
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
}

export default navigation
