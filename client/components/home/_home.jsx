import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const Home = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loading, setLoading] = useState(true);

    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("long", long);
      setLoading(false);
    });
  
  console.log(sessionStorage.getItem("lat"))
  console.log(sessionStorage.getItem("long"))
  
  const goToNewChatPage = () => {
    navigate('/newChatPage');
  };

  const posSet = (pos) => {
    console.log("here")
    setPosition(pos)
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className='dashboard'>
      <div className='page'>
        <Header text="Chatrooms Dashboard"></Header>
        <div className='pageBody'>
        <Button className="add" type="button" onClick={goToNewChatPage}> Add New Chatroom </Button>
          <h3>All Nearby chats:</h3>
          <div className='projectList'> 
            Here
          </div>
        </div>
      </div>
      <footer>
        <p>Created by Command Line Crusaders</p>
        <p>Modern Web Development Spring 2022</p>
      </footer>
    </div>
    
  );
};
