import { Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme } from '@mui/material';

import { FormEvent, useRef, useState } from 'react';

interface FormPropsInterface{
    onSubmit: (heading: string, text: string) => void;
}

export default function Form(props: FormPropsInterface) {
    const form = useRef<HTMLFormElement | null>(null);
    const theme = useTheme();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit("hihitjoho", "hohoteeest")
    };
    return (
        <Box marginTop={3}>
            <form ref={form} onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField label="Rubrik" variant="outlined" fullWidth required name="heading"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Text"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={6}
                            name="text"
                        ></TextField>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2, width: '200px', backgroundColor: theme.palette.info.main }}
                            >
                                Posta
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
