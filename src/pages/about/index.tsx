// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Divider, TextField, DialogActions, Button } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'

const AboutPage = () => {
  const { user } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      message: data.get('message')
    }

    axios
      .post('/contact', payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      .then(() => {
        alert('Contact us berhasil')
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item md={12} lg={8}>
        <Box sx={{ mb: 3, mt: 3 }}>
          <Typography component='h3' variant='h4' align='center' color='text.primary' gutterBottom>
            Tentang Antaratma!
          </Typography>
        </Box>

        <Box sx={{ px: 6, mt: 3 }}>
          <Typography align='left' color='text.secondary' paragraph>
            Antaratma adalah sebuah platform inovatif yang bertujuan untuk memberikan kemudahan dalam memesan tiket
            pameran baik secara online maupun offline. Kami berkomitmen untuk menyediakan akses yang cepat dan praktis
            bagi pengguna untuk menjelajahi berbagai pameran menarik yang tersedia.
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Dalam upaya kami untuk menjadi solusi utama bagi para pecinta seni dan karya kreatif, kami senantiasa
            menggunakan teknologi terkini. Melalui Antaratma, kami ingin memfasilitasi komunikasi langsung antara
            pembeli dengan penyelenggara pameran, sehingga menyediakan pengalaman yang tak terbatas oleh batasan
            geografis.
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Visi kami adalah untuk menjembatani kesenjangan fisik dan memperluas jangkauan pameran seni di seluruh
            dunia. Kami memahami betapa kuatnya daya tarik seni dan kreativitas dalam menghubungkan orang-orang dari
            berbagai belahan dunia, sekaligus memberikan inspirasi kepada mereka. Dengan Antaratma, kami ingin
            memungkinkan siapa pun untuk dengan mudah mengakses pameran-pameran menarik tanpa harus melakukan perjalanan
            jauh.
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Tim kami terdiri dari individu yang penuh semangat dalam menggabungkan seni dan teknologi. Kami bekerja sama
            dengan penyelenggara pameran terpercaya dan berpengalaman untuk memastikan pengalaman memesan tiket yang
            aman, nyaman, dan terpercaya bagi pengguna kami.
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Ketika menggunakan Antaratma, Anda akan dapat menikmati kemudahan menjelajahi berbagai pameran yang sedang
            berlangsung. Informasi detail tentang setiap pameran tersedia untuk Anda, serta proses pemesanan tiket yang
            hanya membutuhkan beberapa klik saja. Kami juga menyediakan opsi pembayaran yang aman dan fleksibel agar
            Anda dapat menikmati pameran favorit dengan tenang.
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Kami tunduk pada prinsip memberikan pengalaman terbaik bagi pengguna kami dan terus berupaya meningkatkan
            platform ini. Kami sangat mengapresiasi umpan balik dari pengguna kami dan siap membantu dengan pertanyaan
            atau kebutuhan apa pun.
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Terima kasih atas kepercayaan Anda dalam menggunakan Antaratma sebagai layanan utama Anda untuk memesan
            tiket pameran online maupun offline. Mari kita bersama-sama menjelajahi dunia seni dan kreativitas yang tak
            terbatas!
          </Typography>
          <Typography align='left' color='text.secondary' paragraph>
            Hormat kami,
            <br />
            Tim Antaratma
          </Typography>
        </Box>
      </Grid>

      <Grid item md={12} lg={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h6' color='rgb(0,0,0)'
                  sx={{
                    mt: 2,
                    fontFamily: 'Poppins'
                  }}>
                  Hubungi Kami
                </Typography>
                <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
                <Box sx={{ pt: 5, pb: 1 }}>
                  <Box component='form' noValidate onSubmit={handleSubmit}>
                    <TextField
                      margin='normal'
                      autoFocus
                      required
                      fullWidth
                      name='name'
                      label='Name'
                      placeholder='Your name'
                    />
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='email'
                      type='email'
                      label='Email'
                      placeholder='abc@gmail.com'
                    />
                    <TextField margin='normal' required fullWidth name='phone' label='Phone' placeholder='+62' />
                    <TextField
                      margin='normal'
                      required
                      name='message'
                      rows={4}
                      multiline
                      fullWidth
                      variant='filled'
                      label='Message'
                      placeholder='Message'
                      id='textarea-outlined-static'
                    />

                    <DialogActions
                      sx={{
                        justifyContent: 'right',
                        pt: 3
                      }}
                    >
                      <Button type='submit' variant='contained' sx={{ mr: 2 }}>
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
    </Grid>
  )
}

AboutPage.acl = {
  action: 'read',
  subject: 'about'
}

export default AboutPage
