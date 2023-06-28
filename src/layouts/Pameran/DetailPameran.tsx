"use client"

import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "@/components/main/Header"
import Main from "@/components/main/Main"
import Sidebar from "@/components/main/Sidebar"
import Footer from "@/components/main/Footer"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"

import View360, { EquirectProjection } from "@egjs/react-view360"
import { useMemo } from "react"
import axios from "axios"
import { posts, sidebar } from "@/tools/helper"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function DetailPameran() {
  const { push } = useRouter()

  const [srcNum, setSrc] = React.useState(0)

  const listSrcTemp = [
    "https://vps.chipkoding.tech/upload/360/1.jpg",
    "https://vps.chipkoding.tech/upload/360/2.jpg",
    "https://vps.chipkoding.tech/upload/360/3.jpg",
    "https://vps.chipkoding.tech/upload/360/4.jpg",
    "https://vps.chipkoding.tech/upload/360/5.jpg",
    "https://vps.chipkoding.tech/upload/360/6.jpg",
    "https://vps.chipkoding.tech/upload/360/7.jpg",
    "https://vps.chipkoding.tech/upload/360/8.jpg",
    "https://vps.chipkoding.tech/upload/360/9.jpg",
    "https://vps.chipkoding.tech/upload/360/10.jpg",
    "https://vps.chipkoding.tech/upload/360/11.jpg",
    "https://vps.chipkoding.tech/upload/360/12.jpg",
    "https://vps.chipkoding.tech/upload/360/13.jpg",
    "https://vps.chipkoding.tech/upload/360/14.jpg",
    "https://vps.chipkoding.tech/upload/360/15.jpg",
    "https://vps.chipkoding.tech/upload/360/16.jpg",
    "https://vps.chipkoding.tech/upload/360/18.jpg",
    "https://vps.chipkoding.tech/upload/360/19.jpg",
  ]

  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: listSrcTemp[srcNum],
      }),
    [srcNum]
  )

  const nextProjection = React.useCallback(() => {
    const nextRoom = srcNum < listSrcTemp.length ? srcNum + 1 : 0;
    setSrc(nextRoom)
  }, [srcNum])

  const backProjection = React.useCallback(() => {
    const nextRoom = srcNum > 0 ? srcNum - 1 : listSrcTemp.length - 1;
    setSrc(nextRoom)
  }, [srcNum])

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />

        <Button
          variant="outlined"
          sx={{ my: 3 }}
          onClick={() => push("/pameran")}
        >
          Go back
        </Button>

        <Box
          sx={{
            width: "100%",
            height: 500,
          }}
        >
          <View360
            className="CLASS_A"
            canvasClass="CLASS_B"
            hotspot={{
              zoom: true,
            }}
            projection={projection}
          />
        </Box>

        <Button
          variant="outlined"
          sx={{ my: 3 }}
          onClick={() => backProjection()}
        >
          Back
        </Button>

        <Button
          variant="outlined"
          sx={{ my: 3 }}
          onClick={() => nextProjection()}
        >
          Next
        </Button>

        <Grid container spacing={5}>
          <Main title="From the firehose" posts={posts} />

          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
          />
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
