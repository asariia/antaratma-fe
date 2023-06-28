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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function DetailArtikel() {
  const { push } = useRouter()

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
          {/* //test */}
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
