import emailjs from '@emailjs/browser';
import { Button, Card, CardContent, Grid, TextField, Typography, useTheme } from '@mui/material';
import { FormEvent, useRef } from 'react';

export const ContactPage = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const theme = useTheme();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            emailjs.sendForm('service_fifp274', 'template_gwyetyj', form.current, 'S7vB59LPY-qji_Dhu').then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
            form.current.reset();
        }
    };
    return (
        <>
            <Grid item sm={8}>
                <Card sx={{ padding: '20px 5px' }} elevation={0}>
                    <CardContent>
                        <Typography gutterBottom color="secondary" variant="h5">
                            Kontakta oss
                        </Typography>
                        <Typography gutterBottom color="secondary" variant="body2" component="p">
                            Skicka ett mail och vi hör av oss så snart vi kan
                        </Typography>
                        <form ref={form} onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Förnamn"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        name="firstName"
                                        //onChange={(event) => setFirstName(event.target.value)}
                                    >
                                        Förnamn
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Efternamn" variant="outlined" fullWidth required name="lastName">
                                        Efternamn
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        name="email"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Ämne"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        name="subject"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Meddelande"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        multiline
                                        rows={6}
                                        name="message"
                                    ></TextField>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            sx={{ mt: 2, width: '200px', backgroundColor: theme.palette.info.main, }}
                                        >
                                            Skicka
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sm={4}>
                {/* <Carousel>
          {images.map((imageUrl) => (
            <CarouselItem imageUrl={imageUrl} />
          ))}
        </Carousel> */}
            </Grid>
        </>
    );
};
