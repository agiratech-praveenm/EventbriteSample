    import React,{useState,useEffect} from 'react';
    import { AppBar, IconButton, Toolbar, Typography, Stack, Button, Menu, MenuItem,Modal, Box} from "@mui/material";
    import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
    import {Link, useNavigate} from 'react-router-dom';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    import axios from 'axios';

    const EventbriteAccessConfirmModal =({open, onClose, onConnect})=>{
        return(
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center'
                    }}
                >
                    <Typography variant='h6' component='div'>
                        Please ensure that you are logged into Eventbrite. If not open new tab and log in to your Eventbrite Account
                    </Typography>
                    <Button variant='contained' onClick={onConnect}>Connect Eventbrite</Button>
                </Box>
            </Modal>
        )
    }
    

    const NavBar =()=>{
        
        const navigate =useNavigate();

        const [anchorEl, setAnchorEl] = useState(null);
        const [eventbriteModalOpen, setEventbriteModalOpen] = useState(false);
        const [username,setUsername] = useState('');

        const handleMenuOpen = (event)=> {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuClose =(event)=>{
            setAnchorEl(null);
        }

        const handleLogOut = () => {
            localStorage.removeItem('token'); // Clearing JWT token from localStorage during logout
            setUsername(null);
            navigate('/');
        };

        const handleOpenEventbriteModal=()=>{
            setEventbriteModalOpen(true);
        }

        const handleCloseEventbriteModal = () => {
            setEventbriteModalOpen(false);
        };
        
        const handleConnectEventbrite = () => {
            handleAccessEventbrite();
            setEventbriteModalOpen(false);
        };

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

        const handleMyEvents= async() =>{
            try{
                const token=localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/myevents',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                const events = response.data;
                console.log(events);
                navigate('/myevents',{state:{events}});
            } catch(error){
                console.error('Error fetching events:', error);
            }
        };

        const handleLogoClick=()=>{
            navigate('/');
        }

        useEffect(() => {
            const fetchUsername = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                const user = response.data;
                setUsername(user.username);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
            };
        
            if (localStorage.getItem('token')) {
            fetchUsername();
            }
        }, []);


        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={handleLogoClick}>
                        <CatchingPokemonIcon/>
                        ScrapeBrite
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}/>
                    <Stack direction='row' spacing={1}> 
                        <Button color='inherit' onClick={handleMyEvents}>MyEvents</Button>
                        <Button color='inherit'>BuyTickets</Button>
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
                            <MenuItem onClick={handleOpenEventbriteModal}>Access Eventbrite</MenuItem>
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
                <EventbriteAccessConfirmModal
                open={eventbriteModalOpen}
                onClose={handleCloseEventbriteModal}
                onConnect={handleConnectEventbrite}
                />
            </AppBar>
        )
    }

    export default NavBar;