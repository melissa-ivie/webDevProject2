import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const Home = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  var localChats = [];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [chatrooms, setChatrooms] = useState(true);
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  useEffect(async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLat(latitude);
      setLon(longitude);
    }, console.log, options);
    setLoading(false);
  }, []);

  useEffect(async () => {
    const res = await api.get('/chatrooms');
    setChatrooms(res.chatrooms);
  }, []);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
  }, []);

  const goToNewChatPage = () => {
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lon", lon);
    navigate('/newChatPage');
  };

  const goToChatPage = (p, pro) => {
    let enterTime = new Date();
    sessionStorage.setItem("selectedChat", pro.title);
    sessionStorage.setItem("enterTime", parseFloat(enterTime.getTime()));
    navigate('/chatpage');
  };

  const getChatrooms = () => {
    let latitude = lat;
    let longitude = lon;
    let chatObj = {};
    for(const chat in chatrooms){
      let currentChat = chatrooms[chat];
      let prID = currentChat.id; 
      let chatLat = currentChat.lat;
      let chatLon = currentChat.lon;
      if((Math.abs(chatLat-latitude) < .006) && (Math.abs(chatLon-longitude) < .005)){
        chatObj[prID] = currentChat
      }
    }
    localChats = Object.assign(localChats,chatObj)
  };

  if (loading) {
    return <div>Loading...</div>;
  }else{
    return (
      <div className='dashboard'>
        <div className='page'>
          <Header text="Chatrooms Dashboard"></Header>
          <div className='pageBody'>
          <Button className="add" type="button" onClick={goToNewChatPage}> Add New Chatroom </Button>
            <h3>All Nearby chats:</h3> {getChatrooms()}
            <div className='projectList'> 
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
  }
};
