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

// import { clsx } from 'clsx';
// import { PanoViewer, SpinViewer, PROJECTION_TYPE } from "@egjs/react-view360";


const ACLPage = () => {
  // ** Hooks
  const router = useRouter()
  const { user } = useAuth()
  if (!router.isReady) return
  const useAxios = makeUseAxios({
    axios: axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASEURL,
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
  })
  const [{ data: blogs = [], error, loading }, executeBlogs] = useAxios<any>(
    {
      url: '/fest'
    },
    { manual: true }
  )

  const [{ data: blog = [], error: errblog, loading: blogLoading }, executeBlog] = useAxios<any>(
    {
      url: '/fest/' + router.query.id
    },
    { manual: true }
  )
  useEffect(() => {
    executeBlogs()

    executeBlog()
  }, [])

  // const hotspots = [
  //   {
  //     type: "search",
  //     yaw: 232,
  //     pitch: -14,
  //     book: 1
  //   },
  //   {
  //     type: "search",
  //     yaw: 133,
  //     pitch: -18,
  //     book: 2
  //   },
  //   {
  //     type: "search",
  //     yaw: 186,
  //     pitch: -17,
  //     book: 3
  //   },
  //   {
  //     type: "link",
  //     yaw: 94,
  //     pitch: -8,
  //     text: "Economy\nCulture"
  //   }
  // ]

  const [srcNum, setSrc] = useState(0)

  const listSrcTemp: any = [
    'https://vps.chipkoding.tech/upload/compress/2.webp',
    'https://vps.chipkoding.tech/upload/compress/3.webp',
    'https://vps.chipkoding.tech/upload/compress/4.webp',
    'https://vps.chipkoding.tech/upload/compress/5.webp',
    'https://vps.chipkoding.tech/upload/compress/6.webp',
    'https://vps.chipkoding.tech/upload/compress/7.webp',
    'https://vps.chipkoding.tech/upload/compress/8.webp',
    'https://vps.chipkoding.tech/upload/compress/9.webp',
    'https://vps.chipkoding.tech/upload/compress/10.webp',
    'https://vps.chipkoding.tech/upload/compress/11.webp'
  ]

  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: listSrcTemp[srcNum]
      }),
    [srcNum]
  )

  const nextProjection = useCallback(() => {
    const nextRoom = srcNum < listSrcTemp.length - 1 ? srcNum + 1 : 0
    setSrc(nextRoom)
  }, [srcNum])

  const backProjection = useCallback(() => {
    const nextRoom = srcNum > 0 ? srcNum - 1 : listSrcTemp.length - 1
    setSrc(nextRoom)
  }, [srcNum])

  return (
    <Grid container spacing={6}>
      <Grid item md={12} lg={12}>
        <Button variant='outlined' sx={{ my: 3 }} onClick={() => router.replace('/artikel')}>
          Kembali
        </Button>
      </Grid>

      <Grid item lg={12} spacing={4}>
        {blogLoading && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {((!blog.title || errblog) && !blogLoading && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
            <>
              <Grid item lg={12}>
                <Box sx={{ mb: 3, mt: 3 }}>
                  <Typography component='h3' variant='h4' align='center' color='text.primary' gutterBottom>
                    {blog.title}
                  </Typography>
                </Box>

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
                  <Button variant='outlined' sx={{ my: 3 }} onClick={() => backProjection()}>
                    Back
                  </Button>

                  <Button variant='outlined' sx={{ my: 3 }} onClick={() => nextProjection()}>
                    Next
                  </Button>
                </Box>

                <Box sx={{ px: 6, mt: 3 }}>
                  <Typography align='left' color='text.secondary' paragraph>
                    {blog.description}
                  </Typography>
                </Box>
              </Grid>
            </>
          )}
      </Grid>

      <Grid item lg={12} spacing={4}>
        <Typography component='h3' variant='h4' align='center' color='text.primary' gutterBottom>
          Pameran Lainnya
        </Typography>
        {loading && (
          <Typography align='center' color='text.secondary' paragraph>
            Loading...
          </Typography>
        )}
        {((!blogs.length || error) && !loading && (
          <Typography align='center' color='text.secondary' paragraph>
            Data Empty
          </Typography>
        )) || (
            <Grid container spacing={4}>
              {blogs.map((e: any) => (
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
