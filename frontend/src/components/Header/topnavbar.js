import React,{useState} from 'react';
import { AppBar, IconButton, Toolbar, Typography, Stack, Button, Menu, MenuItem} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import {Link, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
 

const NavBar =({username})=>{
    
    const navigate =useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event)=> {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose =(event)=>{
        setAnchorEl(null);
    }

    const handleLogOut=()=>{
        const username = null;
        localStorage.removeItem('token'); //clearing JWT token from localStorage during logout
        navigate('/',{state:{username}});
    }

    const handleAccessEventbrite= async ()=>{
        try{
            //get the JWT token from LocalStorage
            const token = localStorage.getItem('token');
            //make a request to backend API to access Eventbrite
            const response = await axios.get('http://localhost:8080/api/eventbriteaccess/authorize', {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            // Extract the authorization URL from the response
            const authorizationUrl = response.data.authorizationUrl;
            // Redirect the user to the Eventbrite authorization URL
            window.location.href = authorizationUrl;
        } catch(error){
            console.error('Error accessing Eventbrite:', error);
        }
    }


    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <CatchingPokemonIcon/>
                    ScrapeBrite
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}/>
                <Stack direction='row' spacing={1}> 
                    <Button color='inherit'>Features</Button>
                    <Button color='inherit'>Pricing</Button>
                    <Button color='inherit'>About</Button>
                    {username ? (
                    <>
                        <Button color='inherit' onClick={handleMenuOpen}><AccountCircleIcon/>{username}</Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                        <MenuItem onClick={handleAccessEventbrite}>Access Eventbrite</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                        </Menu>
                    </>
                    
                    ) : (
                    <Button color='inherit' component={Link} to='./login'>
                    Login
                    </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;