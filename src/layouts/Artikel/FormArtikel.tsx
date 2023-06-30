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
  Card,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material"
import { useEffect, useState } from "react"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import axios from "axios"
import { config } from "@/tools/helper"
import { useThemeContext } from "@/app/UserContext"


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

export default function DetailArtikel() {
  const { push } = useRouter()
  const [image, setImage] = useState([] as { img: string; featured: boolean }[])
  
  const {user}: any = useThemeContext()
  if (user?.name) return push("/")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)
    event.preventDefault()

    const payload = {
      title: data.get("title"),
      photos: image.map((e) => e.img),
      description: data.get("description"),
    }
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL
    axios.defaults.withCredentials = true
    axios.post("/blog", payload, {
    headers: {
        Authorization: `Bearer ${user?.token}`,
    },
}).then((response) => {
      alert('tambah artikel berhasil')
      push('/artikel')
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
            Buat Artikel
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
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
                      name="title"
                      label="Judul"
                      placeholder="Judul Postingan"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      focused
                      name="photos"
                      type="file"
                      label="Tumbnail"
                      inputProps={{
                        accept: ".jpg,.jpeg,.png,.webp",
                        multiple: "multiple",
                      }}
                      onChange={(image: any) => {
                        // if (image.target.value) setImage(image.target.value)

                        const [file] = image.target.files
                        if (file) {
                          const data = new FormData()
                          for (let i = 0; i < image.target.files.length; i++) {
                            data.append("sendimage", image.target.files[i])
                            axios
                              .post(
                                "https://vps.chipkoding.tech/upload.php",
                                data,
                                {
                                  headers: {
                                    "Content-type": "multipart/form-data",
                                  },
                                }
                              )
                              .then(async (response) => {
                                const { data: data } = response
                                setImage((prev) => {
                                  return [
                                    ...prev,
                                    {
                                      img: `https://vps.chipkoding.tech/upload/${data.fileName}`,
                                      featured: !prev.length,
                                    },
                                  ]
                                })

                                console.log({ data })
                                // const { data: filename, data: status } = await axios.post(
                                //   "/upload-by-link",
                                //   {
                                //     vps: true,
                                //     link: "https://vps.chipkoding.tech/upload/" + data.fileName,
                                //   },
                                //   config
                                // )
                              })
                          }
                          image.target.value = ""
                          // axios
                          //   .post("/upload", data, {
                          //     headers: { "Content-type": "multipart/form-data" },
                          //   })
                          //   .then((response) => {
                          //     const { data: filenames } = response
                          //     onChange((prev) => {
                          //       return [...prev, ...filenames]
                          //     })
                          //   })
                        }
                      }}
                    />

                    <ImageList
                      sx={{
                        display: !image?.length ? "none" : "block",
                        width: 500,
                        height: 450,
                        transform: "translateZ(0)",
                      }}
                      rowHeight={200}
                      gap={1}
                    >
                      {image.map((item: any, index: number) => {
                        const cols = 2
                        const rows = 2

                        return (
                          <ImageListItem key={item.img} cols={cols} rows={rows}>
                            <img
                              {...srcset(item.img, 250, 400, rows, cols)}
                              alt={"image"}
                              loading="lazy"
                            />
                            <ImageListItemBar
                              sx={{
                                background:
                                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                              }}
                              position="top"
                              actionIcon={
                                <IconButton
                                  sx={{
                                    color: item.featured ? "gold" : "white",
                                  }}
                                  aria-label={`star`}
                                  onClick={() =>
                                    setImage((prev: any) => {
                                      return prev.map((e: any, id: number) => ({
                                        ...e,
                                        featured: id === index,
                                      }))
                                    })
                                  }
                                >
                                  <StarBorderIcon />
                                </IconButton>
                              }
                              actionPosition="left"
                            />
                            <ImageListItemBar
                              sx={{
                                background:
                                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                              }}
                              position="top"
                              actionIcon={
                                <IconButton
                                  sx={{ color: "red" }}
                                  aria-label={`delete`}
                                  onClick={() =>
                                    setImage((prev: any) => {
                                      return prev.filter(
                                        (e: any, id: number) => id != index
                                      )
                                    })
                                  }
                                >
                                  <DeleteOutlineIcon />
                                </IconButton>
                              }
                              actionPosition="right"
                            />
                          </ImageListItem>
                        )
                      })}
                    </ImageList>

                    <TextField
                      margin="normal"
                      required
                      name="description"
                      rows={4}
                      multiline
                      fullWidth
                      variant="filled"
                      label="Deskripsi"
                      placeholder="..."
                      id="textarea-outlined-static"
                    />

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
            </Card>
          </Grid>
        </Grid>
      <Footer />
      </Container>
  )
}
