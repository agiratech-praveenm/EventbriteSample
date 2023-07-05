import React from 'react';
// import { Link } from 'react-router-dom';
import NavBar from './Header/topnavbar';
import { useLocation } from 'react-router-dom';


const Homepage = () => {

  const location = useLocation();
  console.log("location:",location);

  const username = location.state ? location.state.username : null;
  console.log("usernameonHomepage:",username);

  return (
    <div className="Homepage">
      <NavBar username={username}/>
    </div>
  );
}

export default Homepage;