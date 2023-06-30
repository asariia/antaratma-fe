"use client"

import * as React from "react"

import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "@/components/main/Header"
import Footer from "@/components/main/Footer"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Card, CardContent, CardMedia, CardActions } from "@mui/material"

import { useRouter } from "next/navigation"
import { descTrim } from "@/tools/helper"
import axios from "axios"
import { makeUseAxios } from "axios-hooks"
import { useThemeContext } from "@/app/UserContext"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function ListPameran() {
  const { push } = useRouter()
  const { user }: any = useThemeContext()

  const useAxios = makeUseAxios({
    axios: axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASEURL,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }),
  })
  const [
    { data: ListOfflineData = [], error: errOff, loading: loadOff },
  ] = useAxios<any>({
    url: "/places?online=false",
  })

  const [
    { data: ListOnlineData = [], error: errOn, loading: loadOn },
  ] = useAxios<any>({
    url: "/places?online=true",
  })

  return (
      <Container maxWidth="xl">
        <Header />
        <Box>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ mb: 12 }}>
                <Typography
                  component="h3"
                  variant="h4"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Pameran Antaratma
                </Typography>
                <Typography align="center" color="text.secondary" paragraph>
                  Kami menyediakan artikel-artikel terbaru seputar dunia
                  pameran. Pelajari lebih lanjut tentang bagaimana memaksimalkan
                  pengalaman dalam mengunjungi pameran dan tips-tips lainnya
                  seputar dunia pameran. Jangan lewatkan kesempatan untuk
                  meningkatkan pengetahuan Anda tentang pameran!
                </Typography>
              </Box>

              <Typography
                component="h4"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Pameran Offline
              </Typography>

              {loadOff && (
                <Typography align="center" color="text.secondary" paragraph>
                  Loading...
                </Typography>
              )}
              {((errOff || !ListOfflineData.length) && !loadOn && (
                <Typography align="center" color="text.secondary" paragraph>
                  Data Empty
                </Typography>
              )) || (
                <Container maxWidth="lg">
                  <Grid container spacing={4}>
                    {ListOfflineData.map((e: any) => (
                      <Grid item xs={12} sm={6} md={4} key={e._id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              // 16:9
                              pt: "56.25%",
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {e.title}
                            </Typography>
                            <Typography>{descTrim(e.description)}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              onClick={() => push("/pameran/" + e)}
                            >
                              View
                            </Button>
                            {/* <Button size="small">Edit</Button> */}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              )}

              <Typography
                component="h4"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Pameran Online
              </Typography>

              {loadOn && (
                <Typography align="center" color="text.secondary" paragraph>
                  Loading...
                </Typography>
              )}
              {((errOn || !ListOnlineData.length) && !loadOn && (
                <Typography align="center" color="text.secondary" paragraph>
                  Data Empty
                </Typography>
              )) || (
                <Container maxWidth="lg">
                  <Grid container spacing={4}>
                    {ListOnlineData.map((e: any) => (
                      <Grid item xs={12} sm={6} md={4} key={e._id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              // 16:9
                              pt: "56.25%",
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {e.title}
                            </Typography>
                            <Typography>{descTrim(e.description)}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              onClick={() => push("/pameran/" + e._id)}
                            >
                              View
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              )}
            </Container>
          </Box>
        </Box>
      </Container>
  )
}
