import React from 'react';
import NavBar from './Header/topnavbar';
import {useLocation} from 'react-router-dom'

const EventsList = ()=>{
    const location = useLocation();
    const {state} = location;
    const events = state && state.events ? state.events: [];

    return (

        <div className="Homepage">
            <NavBar/>
            {
                events.map((event)=>(
                    <div key={event.id}>
                        <h3>{event.name.text}</h3>
                        <p>{event.summary}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default EventsList;