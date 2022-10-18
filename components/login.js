import { Box, TextField, Button, CssBaseline, Typography, Avatar } from '@mui/material'
import { Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const theme = createTheme();

export default function Login (){
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(event){
        const {name, value, type} = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }));
    }

    async function handleSubmit(event){
        event.preventDefault();
        console.log("Mando la informacion del formulario");
        console.log(formData);
        try{
            var response = await fetch('http://localhost:8080/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData)});
            var data = await response.json();
            console.log(data);
        }catch(e){
            console.log(e.message);
        }
        
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '30px'
                }}
                >
                    <Typography component="h1" variant="h5" sx={{
                        color: 'black'
                    }}>
                        Login
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={formData.password}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>  
    )
}

