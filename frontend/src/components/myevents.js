import React from 'react';
import NavBar from './Header/topnavbar';
import {useLocation} from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography, Grid} from '@mui/material';
import './Eventlist.css';
import eventbritelogo from './eventbritecardlogo.png'

const EventsList = ()=>{
    const location = useLocation();
    const {state} = location;
    const events = state && state.events ? state.events: [];

    return (

        <div className="myevents">
            <NavBar/>
            <h1>Your Eventbrite Events</h1>
            <Grid container spacing={2} padding="10px">
            {
                events.map((event)=>(
                <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                    <Card key={event.id} className="event-card">
                    {event.logo && event.logo.url ? (
                        <CardMedia
                        component="img"
                        height="140"
                        image={event.logo.url}
                        />
                    ) : 
                        <CardMedia
                        component="img"
                        height="140"
                        image={eventbritelogo}
                        />
                    }
                        <CardContent>
                            <Typography variant="h5" component="div" className="event-name">
                                {event.name.text}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.summary}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Start Date: {event.start.local}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                End Date: {event.end.local}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
            
        </div>
    );
};

export default EventsList;