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
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import { posts, sidebar } from "@/tools/helper"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function DetailArtikel() {
  const { push } = useRouter()

  return (
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
          <Main title="From the firehose" posts={posts} />

          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
          />
        </Grid>
      <Footer />
      </Container>
  )
}
