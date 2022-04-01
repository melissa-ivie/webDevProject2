import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../utils/api_context';

import { Button } from '../common/button';
import { useMessages } from '../../utils/use_messages';
import { Message } from './message';

export const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [contents, setContents] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const api = useContext(ApiContext);
  const { id } = useParams();
  const [messages, sendMessage] = useMessages(chatRoom);
  useEffect(async () => {
    setLoading(true);
    if (!user) {
      const { user } = await api.get('/users/me');
      setUser(user);
    }
    const { chatRoom } = await api.get(`/chat_rooms/${id}`);
    setChatRoom(chatRoom);
    setLoading(false);
  }, [id]);

  if (loading) return 'Loading...';

  const sendVals = (contents, user) => {
    sessionStorage.setItem("uID",user.id);
    sendMessage(contents,user);
    setContents("");
  }

  return (
    <div className="chat-container">
      <div className='messageSection'>
        {messages.map((message) => (
          <Message key={message.id} message={message}/>
        ))}
      </div>
      <div className='sendSection'>
        <p></p>
        <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
        <Button onClick={() => sendVals(contents, user)}>Send</Button>
      </div>
    </div>
  );
};
