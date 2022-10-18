import { Box, TextField, Button, CssBaseline, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const theme = createTheme();

export default function Login (){
    // State router controls the routing
    const router = useRouter();
    // Controls the submit state of the form
    const [submit, setSubmit] = useState(false);
    // State of the form data
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Handle the form changes and update the form state
    function handleChange(event){
        const {name, value, type} = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }));
    }

    // Handle the submit event and prevent the deafult submit behavior
    function handleSubmit(event){
        event.preventDefault();
        console.log("Form information sent:");
        console.log(formData);
        setSubmit(true);
    }

    // Perform the login when the submit button is clicked and the form is filled
    useEffect(() => {
        console.log("------- Effect Ran -------")
        if (formData.email !== "" && formData !== "") {
            console.log("------- Perform login request -------")
            loginRequest();
        }
    }, [submit])

    // Send the POST request
    async function loginRequest(){
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
            console.log(data.status);
            if(data.status !== 500){
                router.push('/home');
            }else{
                alert("Incorrect credentials :(");
            }
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

