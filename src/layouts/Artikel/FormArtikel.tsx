"use client"

import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "@/components/main/Header"
import Footer from "@/components/main/Footer"
import Button from "@mui/material/Button"
import { useParams, useRouter } from "next/navigation"
import {
  CardContent,
  Typography,
  Divider,
  Box,
  TextField,
  DialogActions,
} from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "@/tools/helper"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function DetailArtikel() {
  const { push } = useRouter()
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [photo360, setPhoto360] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [description, setDescription] = useState("")
  const [simpletext, setSimpleText] = useState("")
  const [maxGuests, setMaxGuests] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get("/places/" + id, config).then((response) => {
      const { data } = response
      setTitle(data.title)
      setAddress(data.address)
      setPhoto360(data.photo360)
      setThumbnail(data.thumbnail)
      setDescription(data.description)
      setSimpleText(data.simpletext)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)
    event.preventDefault()

    console.log({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />

        <Button
          variant="outlined"
          sx={{ my: 3 }}
          onClick={() => push("/artikel")}
        >
          Go back
        </Button>
        <Grid container spacing={5}>
          <CardContent>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Contact Us
            </Typography>
            <Divider sx={{ mt: (theme) => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 5, pb: 1 }}>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item lg={12}>
                    <TextField
                      required
                      fullWidth
                      name="name"
                      label="Name"
                      placeholder="Your name"
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="abc@gmail.com"
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      required
                      fullWidth
                      name="phone"
                      label="Phone"
                      placeholder="+62"
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
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
                  </Grid>
                </Grid>

                <DialogActions
                  sx={{
                    justifyContent: "right",
                    pt: 3,
                  }}
                >
                  <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                    Submit
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
