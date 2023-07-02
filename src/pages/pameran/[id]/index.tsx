/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import { useEffect, useState, useCallback, useMemo } from 'react'

// ** Axios
import axios from 'axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, CardActions, CardMedia } from '@mui/material'
import { Box } from '@mui/system'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { makeUseAxios } from 'axios-hooks'
import View360, { EquirectProjection } from '@egjs/react-view360'

// ** Third Party Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// import { clsx } from 'clsx';
// import { PanoViewer, SpinViewer, PROJECTION_TYPE } from "@egjs/react-view360";


const ACLPage = () => {
  // ** Hooks
  const router = useRouter()
  const { user } = useAuth()
  const [srcNum, setSrc] = useState(0)
  if (!router.isReady) return
  const useAxios = makeUseAxios({
    axios: axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASEURL,
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
  })

  const [{ data: fests = [], error, loading }, executeFests] = useAxios<any>(
    {
      url: '/fests'
    },
    { manual: true }
  )

  const [{ data: fest = {}, error: errfest, loading: festLoading }, executeFest] = useAxios<any>(
    {
      url: '/fest/' + router.query.id
    },
    { manual: true }
  )

  useEffect(() => {
    executeFests()
    executeFest()
  }, [])

  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: fest.photos360?.[srcNum] || ''
      }),
    [srcNum, fest.photos360]
  )

  const nextProjection = useCallback(() => {
    const nextRoom = srcNum < fest.photos360.length - 1 ? srcNum + 1 : 0
    setSrc(nextRoom)
  }, [srcNum, fest.photos360])

  const backProjection = useCallback(() => {
    const nextRoom = srcNum > 0 ? srcNum - 1 : fest.photos360.length - 1
    setSrc(nextRoom)
  }, [srcNum, fest.photos360])

  return (
    <Grid container spacing={6}>
      <Grid item md={12} lg={12}>
        <Button variant='outlined' sx={{ my: 3 }} onClick={() => router.replace('/pameran')}>
          Kembali
        </Button>
      </Grid>

      <Grid item lg={12} spacing={4}>
        {festLoading && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {((!fest.title || errfest) && !festLoading && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
          <Grid item lg={12}>
            <Box sx={{ mb: 3, mt: 3 }}>
              <Typography component='h3' variant='h4' align='center' color='text.primary' gutterBottom>
                {fest.title}
              </Typography>
            </Box>

            {fest?.photos360?.length &&
                <Box
                  sx={{
                    width: '100%',
                    height: 665
                  }}
                >
                  <View360
                    className='CLASS_A'
                    canvasClass='CLASS_B'
                    hotspot={{
                      zoom: true
                    }}
                    projection={projection}
                    autoResize
                  >
                    {/* <div className="view360-hotspots">
                      {hotspots.map((hotspot, idx) => (
                        <div key={srcNum * 100 + idx} // A very rough way of bypassing key duplication
                          // Bind different class name by hotspot type
                          className={clsx("view360-hotspot", hotspot.type === "search" ? 'search' : 'link')}
                          data-yaw={hotspot.yaw}
                          data-pitch={hotspot.pitch}>
                          {hotspot.type === "link" ? hotspot.text : ""}
                        </div>
                      ))}
                    </div> */}
                </View360>

                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Button variant='outlined' sx={{ my: 3 }} onClick={() => backProjection()}>
                    Back
                  </Button>

                  <Button variant='outlined' sx={{ my: 3 }} onClick={() => nextProjection()}>
                    Next
                  </Button>
                </Box>
              </Box>
            }

            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {fest?.photos?.map((e: string) => (
                <SwiperSlide key={e}>
                  <img src={e} alt={e} style={{ width: '100%' }} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Box sx={{ px: 6, mt: 3 }}>
              <Typography align='left' color='text.secondary' paragraph>
                {fest.description}
              </Typography>
            </Box>
          </Grid>
          )}
      </Grid>

      <Grid item lg={12} spacing={4}>
        <Typography component='h3' variant='h4' align='center' sx={{ my: 12 }} color='text.primary' gutterBottom>
          Pameran Lainnya
        </Typography>
        {loading && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {((!fests.length || error) && !loading && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
            <Grid container spacing={4}>
            {fests.map((e: any) => (
                <Grid item xs={12} sm={6} md={4} key={e._id} sx={{ mb: 4 }}>
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
                    <Typography>{e.simpleText}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' onClick={() => router.replace('/artikel/' + e._id)}>
                      Pameran {e.online ? 'online' : 'offline'}
                      </Button>
                    </CardActions>
                  </Card>
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
