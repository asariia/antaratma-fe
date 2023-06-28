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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function ListArtikel() {
  const { push } = useRouter()

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ my: 12 }}>
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
              </Box>

              <Grid container spacing={4}>
                {[1, 2, 3, 4, 5, 6].map((e) => (
                  <Grid item xs={12} sm={6} md={4} key={e}>
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
                          Heading
                        </Typography>
                        <Typography>
                          This is a media card. You can use this section to
                          describe the content.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => push("/artikel/" + e)}
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
