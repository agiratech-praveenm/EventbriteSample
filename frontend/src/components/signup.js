import React, { useState } from 'react';
import { Grid, Paper, Avatar, IconButton, TextField, Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [signupError, setSignUpError] = useState(false);
  // const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const paperStyle = { padding: 10, height: '70vh', width: 400, margin: "20px auto" };
  const customGrid = { justifyContent: "center", alignItems: "center", marginTop: "-20px" };
  const avatarStyle = { backgroundColor: "#005792", marginTop: "50px" };
  const h3style = { marginTop: "5px" };
  const pageStyle = { backgroundColor: "#005792", height: '100vh' };
  const textboxStyle = { marginBottom: "20px" };
  const buttonStyle = { height: "40px", color: "white" };
  const errorTextStyle = { color: "red", marginTop: "-20px", marginBottom:"20px" };

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
        axios
            .post('http://localhost:8080/api/signup', {username, password})
            .then((response)=>{
                console.log('Signup successful:', response.data);
                // setSignupSuccess(true);
                const currentUser = username;
                
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                navigate('/');
            })
            .catch((error=>{
                console.error('Signup failed:', error);
                if (error.response && error.response.status === 409) {
                  setSignUpError('Username already exists');
                } else {
                  setSignUpError('Failed to signup');
                }
            }));
    //   console.log('Username:', username);
    //   console.log('Password:', password);
      setPasswordMatchError(false);
    }
  };

  return (
    <div style={pageStyle}>
      <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
        <CatchingPokemonIcon />
        ScrapeBrite
      </IconButton>
      <Grid container style={customGrid}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <h3 style={h3style}>Sign Up</h3>
          </Grid>
          <form onSubmit={handleSignup}>
            <TextField
              style={textboxStyle}
              label='Username'
              placeholder='Enter username'
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={textboxStyle}
              label='Password'
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              style={textboxStyle}
              label='Confirm Password'
              placeholder='Confirm password'
              type='password'
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordMatchError && (
              <Typography variant="body2" style={errorTextStyle}>
                Password and confirm password do not match.
              </Typography>
            )}
            {signupError && (
              <Typography variant="body2" style={errorTextStyle}>
              {signupError}
              </Typography>
            )}

            <Button
              style={buttonStyle}
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Signup;
