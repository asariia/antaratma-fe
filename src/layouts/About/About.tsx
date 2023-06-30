"use client"

import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "@/components/main/Header"
import Footer from "@/components/main/Footer"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  InputAdornment,
  DialogActions,
  CardMedia,
} from "@mui/material"
import CustomAvatar from "@/components/mui/avatar"
import { getInitials } from "@/tools/get-initials"

const data: any = {
  id: 1,
  role: "admin",
  status: "active",
  username: "Daisy Patterson",
  avatarColor: "primary",
  country: "El Salvador",
  company: "Yotz PVT LTD",
  contact: "(479) 232-9151",
  currentPlan: "enterprise",
  fullName: "Daisy Patterson",
  email: "gslixby0@abc.net.au",
  avatar: "/images/avatars/4.png",
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function About() {
  const { push } = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    console.log({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    })
  }

  return (
      <Container maxWidth="xl">
        <Header />

        <Button variant="outlined" sx={{ my: 3 }} onClick={() => push("/")}>
          Go back
        </Button>

        <Box sx={{ backgroundColor: "#eee", py: 8 }}>
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Tentang Kami
          </Typography>
        </Box>

        <Grid container>
          <Grid item md={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Hubungi Kami
                    </Typography>
                    <Divider
                      sx={{ mt: (theme) => `${theme.spacing(4)} !important` }}
                    />
                    <Box sx={{ pt: 5, pb: 1 }}>
                      <Box component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                          margin="normal"
                          autoFocus
                          required
                          fullWidth
                          name="name"
                          label="Name"
                          placeholder="Your name"
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="abc@gmail.com"
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="phone"
                          label="Phone"
                          placeholder="+62"
                        />
                        <TextField
                          margin="normal"
                          required
                          name="message"
                          rows={4}
                          multiline
                          fullWidth
                          variant="filled"
                          label="Message"
                          placeholder="Message"
                          id="textarea-outlined-static"
                        />

                        <DialogActions
                          sx={{
                            justifyContent: "right",
                            pt: 3,
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mr: 2 }}
                          >
                            Submit
                          </Button>
                        </DialogActions>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} lg={8}>
            <Box sx={{ mb: 3, mt: 3 }}>
              <Typography
                component="h3"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Tentang Antaratma!
              </Typography>
            </Box>

            <Box sx={{ px: 6, mt: 3 }}>
              <Typography align="left" color="text.secondary" paragraph>
                Antaratma adalah sebuah platform inovatif yang bertujuan untuk
                memberikan kemudahan dalam memesan tiket pameran baik secara
                online maupun offline. Kami berkomitmen untuk menyediakan akses
                yang cepat dan praktis bagi pengguna untuk menjelajahi berbagai
                pameran menarik yang tersedia.
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Dalam upaya kami untuk menjadi solusi utama bagi para pecinta
                seni dan karya kreatif, kami senantiasa menggunakan teknologi
                terkini. Melalui Antaratma, kami ingin memfasilitasi komunikasi
                langsung antara pembeli dengan penyelenggara pameran, sehingga
                menyediakan pengalaman yang tak terbatas oleh batasan geografis.
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Visi kami adalah untuk menjembatani kesenjangan fisik dan
                memperluas jangkauan pameran seni di seluruh dunia. Kami
                memahami betapa kuatnya daya tarik seni dan kreativitas dalam
                menghubungkan orang-orang dari berbagai belahan dunia, sekaligus
                memberikan inspirasi kepada mereka. Dengan Antaratma, kami ingin
                memungkinkan siapa pun untuk dengan mudah mengakses
                pameran-pameran menarik tanpa harus melakukan perjalanan jauh.
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Tim kami terdiri dari individu yang penuh semangat dalam
                menggabungkan seni dan teknologi. Kami bekerja sama dengan
                penyelenggara pameran terpercaya dan berpengalaman untuk
                memastikan pengalaman memesan tiket yang aman, nyaman, dan
                terpercaya bagi pengguna kami.
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Ketika menggunakan Antaratma, Anda akan dapat menikmati
                kemudahan menjelajahi berbagai pameran yang sedang berlangsung.
                Informasi detail tentang setiap pameran tersedia untuk Anda,
                serta proses pemesanan tiket yang hanya membutuhkan beberapa
                klik saja. Kami juga menyediakan opsi pembayaran yang aman dan
                fleksibel agar Anda dapat menikmati pameran favorit dengan
                tenang.
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Kami tunduk pada prinsip memberikan pengalaman terbaik bagi
                pengguna kami dan terus berupaya meningkatkan platform ini. Kami
                sangat mengapresiasi umpan balik dari pengguna kami dan siap
                membantu dengan pertanyaan atau kebutuhan apa pun.
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Terima kasih atas kepercayaan Anda dalam menggunakan Antaratma
                sebagai layanan utama Anda untuk memesan tiket pameran online
                maupun offline. Mari kita bersama-sama menjelajahi dunia seni
                dan kreativitas yang tak terbatas!
              </Typography>
              <Typography align="left" color="text.secondary" paragraph>
                Hormat kami,
                <br />
                Tim Antaratma
              </Typography>
            </Box>
          </Grid>
        </Grid>
      <Footer />
      </Container>
  )
}
