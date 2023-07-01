// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Axios
import axios from 'axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, CardMedia, CardActions } from '@mui/material'
import { Container } from '@mui/system'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const ACLPage = () => {
  // ** Hooks
  const router = useRouter()
  const ability = useContext(AbilityContext)

  const [loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)
    axios
      .get('/blog', {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      .then((response: any) => {
        setBlogs(response?.data || [])
        setLoading(false)
      })
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item md={12} sx={{ mb: 12, textAlign: 'center' }}>
        <Typography component='h3' variant='h4' align='center' color='text.primary' gutterBottom>
          Artikel Antaratma
        </Typography>
        <Typography align='center' color='text.secondary' paragraph>
          Kami menyediakan artikel-artikel terbaru seputar dunia pameran. Pelajari lebih lanjut tentang bagaimana
          memaksimalkan pengalaman dalam mengunjungi pameran dan tips-tips lainnya seputar dunia pameran. Jangan
          lewatkan kesempatan untuk meningkatkan pengetahuan Anda tentang pameran!
        </Typography>
        {ability?.can('read', 'analytics') && (
          <Button variant='outlined' sx={{ my: 3 }} onClick={() => router.replace('/artikel/form')}>
            Tambah Artikel
          </Button>
        )}

        {loading && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {(!blogs.length && !loading && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
          <Container maxWidth='lg'>
            <Grid container spacing={4}>
              {blogs.map((e: any) => (
                <Grid item xs={12} sm={6} md={4} key={e._id}>
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
                      image={e.photos.length ? e.photos[0] : 'https://source.unsplash.com/random?wallpapers'}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {e.title}
                      </Typography>
                      <Typography>{e.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' onClick={() => router.replace('/artikel/' + e._id)}>
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Grid>
    </Grid>
  )
}

ACLPage.acl = {
  action: 'read',
  subject: 'artikel'
}

export default ACLPage
