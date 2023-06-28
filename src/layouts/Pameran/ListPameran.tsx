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
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material"
import { useRouter } from "next/navigation"
import useAxios from "axios-hooks"
import { descTrim } from "@/tools/helper"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function ListPameran() {
  const { push } = useRouter()

  const [{ data: ListOfflineData = [] }] = useAxios<any>({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    url: "/api/places",
  })

  const [{ data: ListOnlineData = [] }] = useAxios<any>({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    url: "/api/places",
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
                        <Typography gutterBottom variant="h5" component="h2">
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

              <Typography
                component="h4"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Pameran Online
              </Typography>

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
                        <Typography gutterBottom variant="h5" component="h2">
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
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
