import { useState, useEffect} from 'react';
import { Button } from '../common/button';

export const NewRoomModal = ({ createRoom, closeModal }) => {
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [loading, setLoading] = useState('');
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLoading(false);
      setLat(latitude);
      setLon(longitude);
    }, console.log, options);
  }, []);
  
  if(loading){
    return (
      <>
        <div className="overlay" onClick={closeModal} />
        <div className="modal-container">
          <div className="modal">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }else{
    return (
      <>
        <div className="overlay" onClick={closeModal} />
        <div className="modal-container">
          <div className="modal">
            <span className="title">Create New Chat Room</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="button-container">
              <Button onClick={closeModal}>Close</Button>
              <Button onClick={() => createRoom(name, lat, lon)}>Create</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
};
