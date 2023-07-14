// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import Navigation from '../navigation'

const LogoImage = styled('img')(() => ({
  maxWidth: '2rem'
}))

interface Props {
  hidden: LayoutProps['hidden']
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  appBarContent: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['content']
  appBarBranding: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['branding']
  userNavMenuContent?: any
  horizontalLayoutProps?: any
}

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const {
    appBarContent: userAppBarContent,
    appBarBranding: userAppBarBranding,
    userNavMenuContent,
    horizontalLayoutProps
  } = props

  // ** Hooks
  // const theme = useTheme()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userAppBarBranding ? (
        userAppBarBranding(props)
      ) : (
        <LinkStyled href='/'>
          <LogoImage
            src={
              'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipground.com%2Fimages%2Flotos-clipart-1.png&f=1&nofb=1&ipt=bc6ff02330943ff50512a1acabce8523141d962641452caf6281e9fffa7b804f&ipo=images'
            }
          />
          <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2, fontFamily: 'Mochiy Pop One'}}>
            {themeConfig.templateName}
          </Typography>
        </LinkStyled>
      )}
      {(userNavMenuContent && userNavMenuContent(props)) || (
        <Navigation
          {...props}
          horizontalNavItems={
            (horizontalLayoutProps as NonNullable<LayoutProps['horizontalLayoutProps']>).navMenu?.navItems
          }
        />
      )}
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
