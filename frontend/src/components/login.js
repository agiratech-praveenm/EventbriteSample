import React, {useState} from 'react';
import {Grid, Paper, Avatar, IconButton, TextField, FormControlLabel, Checkbox, Button, Typography, unstable_composeClasses} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login=()=>{

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[signinError,setsigninError]=useState('');
    const navigate = useNavigate();

    const paperStyle = {padding: 10, height: '70vh', width: 400, margin: "20px auto"}
    const customGrid = { justifyContent: "center", alignItems: "center", marginTop: "-20px"}
    const avatarStyle = {backgroundColor: "#005792", marginTop:"50px"}
    const h3style = {marginTop: "5px"}
    const pageStyle = {backgroundColor:"#005792", height:'100vh'}
    const textboxStyle={marginBottom: "20px"}
    const buttonStyle={height:"40px", textColor:"#0000"}
    const linkColor={color:"#005792", padding:'5px'}
    const typographyStyle={padding:"5px"}

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/api/signin',{username, password});
            console.log('SignIn successful: ', response.data);

            // Store the JWT token in local storage
            localStorage.setItem('token', response.data.token);

            navigate('/',{state:{username}});
            console.log('Usernameonlogin:',username);

        } catch(error){
            console.error('SignIn failed:', error);
            setsigninError('Invalid credentials');
        }
        
        //Make POST request to the backend API
        
    }

    return (
        <div style={pageStyle}>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <CatchingPokemonIcon/>
                    ScrapeBrite
            </IconButton>
            <Grid container style={customGrid}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockIcon/></Avatar> 
                        <h3 style={h3style}>Sign In</h3>
                    </Grid>
                    <TextField style={textboxStyle} label='Username' placeholder='Enter username' fullWidth required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField style={textboxStyle} label='Password' placeholder='Enter password' type='password' fullWidth required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FormControlLabel control={<Checkbox/>} label="Remember Me"/>
                    <Button style={buttonStyle} type='submit' color='primary' variant='contained' fullWidth onClick={handleSignIn}>Sign In</Button>
                    {signinError && (
                        <Typography variant="body2" style={typographyStyle}>
                        {signinError}
                        </Typography>
                    )}
                    <Typography style={typographyStyle}>
                        <Link style={linkColor} href="#">Forgot Password</Link>
                    </Typography>
                    <Typography style={typographyStyle}>Do you have an account?
                        <Link style={linkColor} component={Link} to='/signup'>Sign Up</Link>
                    </Typography>
                </Paper>
            </Grid>

        </div>
        
    );
}

export default Login;