// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CardMedia, CardActions, Button, CardActionArea } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { useRouter } from 'next/router'

const descTrim = (desc: string) => {
  return desc.length < 60 ? desc : desc.slice(0, 57) + '...'
}

const ACLPage = () => {
  // ** Hooks
  const router = useRouter()

  const { user } = useAuth()
  const useAxios = makeUseAxios({
    axios: axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASEURL,
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
  })
  const [{ data: ListOfflineData = [], error: errOff, loading: loadOff }] = useAxios<any>({
    url: '/fests?online=false'
  })

  const [{ data: ListOnlineData = [], error: errOn, loading: loadOn }] = useAxios<any>({
    url: '/fests?online=true'
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 12, textAlign: 'center' }}>
        <Typography component='h3' variant='h4' align='center' color='text.primary' gutterBottom>
          Pameran Antaratma
        </Typography>
        <Typography align='center' color='text.secondary' paragraph>
          Kami menyediakan artikel-artikel terbaru seputar dunia pameran. Pelajari lebih lanjut tentang bagaimana
          memaksimalkan pengalaman dalam mengunjungi pameran dan tips-tips lainnya seputar dunia pameran. Jangan
          lewatkan kesempatan untuk meningkatkan pengetahuan Anda tentang pameran!
        </Typography>
        {user?.role === 'admin' && (
          <Button variant='outlined' sx={{ my: 3 }} onClick={() => router.replace('/pameran/form')}>
            Tambah Pameran
          </Button>
        )}

        <Typography component='h4' variant='h5' align='center' sx={{ my: 14 }} color='text.primary' gutterBottom>
          Pameran Offline
        </Typography>

        {loadOff && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {((errOff || !ListOfflineData.length) && !loadOn && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
              <Grid container spacing={4}>
                {ListOfflineData.map((e: any) => (
                  <Grid item xs={12} sm={6} md={4} key={e._id}>
                    <CardActionArea component='a' href={'/pameran/' + e._id}>
                      <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <CardMedia
                        component='div'
                        sx={{
                          // 16:9
                          pt: '56.25%'
                        }}
                        image={e.tumbnail}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {e.title}
                        </Typography>
                        <Typography>{descTrim(e.simpleText)}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size='small' onClick={() => router.replace('/pameran/' + e._id)}>
                            {e.address}
                        </Button>
                        {/* <Button size="small">Edit</Button> */}
                      </CardActions>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
          </Grid>
          )}

        <Typography component='h4' variant='h5' align='center' color='text.primary' sx={{ my: 14 }} gutterBottom>
          Pameran Online
        </Typography>

        {loadOn && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {((errOn || !ListOnlineData.length) && !loadOn && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
            <Grid container spacing={4}>
              {ListOnlineData.map((e: any) => (
                <Grid item xs={12} sm={6} md={4} key={e._id}>
                  <CardActionArea component='a' href={'/pameran/' + e._id}>
                    <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <CardMedia
                      component='div'
                      sx={{
                        // 16:9
                        pt: '56.25%'
                      }}
                      image={e.tumbnail}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {e.title}
                      </Typography>
                      <Typography>{descTrim(e.simpleText)}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' onClick={() => router.replace('/pameran/' + e._id)}>
                          {e.address}
                      </Button>
                    </CardActions>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          )}
      </Grid>
    </Grid>
  )
}

ACLPage.acl = {
  action: 'read',
  subject: 'pameran'
}

export default ACLPage
