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
import axios from "axios"
import { makeUseAxios } from "axios-hooks"
import { useThemeContext } from "@/app/UserContext"


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function ListArtikel() {
  const { push } = useRouter()
  const {user}: any = useThemeContext()

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: process.env.NEXT_PUBLIC_BASEURL, 
    headers: {
        Authorization: `Bearer ${user?.token}`,
    } }),
})
  const [{ data: blogs = [], error, loading }] = useAxios<any>({
    url: "/blog",
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
              <Box sx={{ mb: 12, textAlign: 'center' }}>
                <Typography
                  component="h3"
                  variant="h4"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Artikel Antaratma
                </Typography>
                <Typography align="center" color="text.secondary" paragraph>
                  Kami menyediakan artikel-artikel terbaru seputar dunia
                  pameran. Pelajari lebih lanjut tentang bagaimana memaksimalkan
                  pengalaman dalam mengunjungi pameran dan tips-tips lainnya
                  seputar dunia pameran. Jangan lewatkan kesempatan untuk
                  meningkatkan pengetahuan Anda tentang pameran!
                </Typography>
                { user?.name && <Button
                  variant="outlined"
                  sx={{ my: 3 }}
                  onClick={() => push("/artikel/form")}
                >
                  Tambah Artikel
                </Button>}
              </Box>

              {loading && (
                <Typography align="center" color="text.secondary" paragraph>
                  Loading...
                </Typography>
              )}
              {((error || !blogs.length) && !loading && (
                <Typography align="center" color="text.secondary" paragraph>
                  Data Empty
                </Typography>
              )) || (
                <Container maxWidth="lg">
                  <Grid container spacing={4}>
                    {blogs.map((e: any) => (
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
                            image={
                              e.photos.length
                                ? e.photos[0]
                                : "https://source.unsplash.com/random?wallpapers"
                            }
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {e.title}
                            </Typography>
                            <Typography>{e.description}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              onClick={() => push("/artikel/" + e._id)}
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
      <Footer />
      </Container>
  )
}
