import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const Home = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  var localChats = [];
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatrooms] = useState(true);
  var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  useEffect(async () => {
    const res = await api.get('/chatrooms');
    setChatrooms(res.chatrooms);
  }, []);

    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("long", long);
      setLoading(false);
    }, console.log, options);
  
  const goToNewChatPage = () => {
    navigate('/newChatPage');
  };

  const goToChatPage = (p, pro) => {
    sessionStorage.setItem("selectedChat", pro.title);
    navigate('/chatpage');
  };

  const getChatrooms = (latitude, longitude) => {
    let chatObj = {};
    for(const chat in chatrooms){
      let currentChat = chatrooms[chat];
      let prID = currentChat.id; 
      let chatLat = currentChat.lat;
      let chatLong = currentChat.long;

      if((Math.abs(chatLat-latitude) < .001) && (Math.abs(chatLong-longitude) < .001)){
        chatObj[prID] = currentChat
      }
    }
    localChats = Object.assign(localChats,chatObj)
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
          <div className='projectList'> {getChatrooms(lat, long)}
            {localChats.map((pro) => {
              return <Button type="button" className="project" onClick={p => goToChatPage(p,pro)}>{pro.title}</Button>
            })}
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
