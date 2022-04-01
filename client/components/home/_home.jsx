import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';
import { Link, Route, Routes } from 'react-router-dom';
import { Rooms } from './rooms';
import { Room } from './room';
import { ChatRoom } from '../chat_room/_chat_room';
import { NewRoomModal } from './new_room_modal';
import { useNavigate } from 'react-router';

export const Home = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();

  const [chatRooms, setChatRooms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { chatRooms } = await api.get('/chat_rooms');
    console.log(chatRooms);
    setChatRooms(chatRooms);
    setUser(res.user);
    setLoading(false);
  }, []);

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLat(latitude);
      setLon(longitude);
    }, console.log, options);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const createRoom = async (name, lat, lon) => {
    setIsOpen(false);
    const { chatRoom } = await api.post('/chat_rooms', { name, lat, lon });
    setChatRooms([...chatRooms, chatRoom]);
    navigate(`chat_rooms/${chatRoom.id}`);
  };

  const closeModal = async () => {
    setIsOpen(false);
  };

  return (
    <div className="container">
      <Rooms>
        {chatRooms.map((room) => {
          if((Math.abs(room.lat - lat) < 0.001 ) || (Math.abs(room.lon -  lon) < 0.001)){
            return (
              <Room key={room.id} to={`chat_rooms/${room.id}`}>
                {room.name}
              </Room>
            );
          }
        })}
        <Room action={() => setIsOpen(true)}>+</Room>
      </Rooms>
      <div className="chat-window">
        <Routes>
          <Route path="chat_rooms/:id" element={<ChatRoom />} />
          <Route path="/*" element={<div>Select a room to get started</div>} />
        </Routes>
      </div>
      {isOpen ? <NewRoomModal createRoom={createRoom} closeModal={closeModal}/> : null}
    </div>
  );
};
