import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const ChatPage = () => {
  const api = useContext(ApiContext);
  var incompleteProjectTasks = [];
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [user, setUser] = useState(null);
  const projectID = parseFloat(sessionStorage.getItem("projectID"));
  const currentChat = sessionStorage.getItem("selectedChat");

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <div className='page'>
      <Header text={currentChat}></Header>
      <div className='pageBody'>
        Messages Appear Here
      </div>
      </div>
      <footer>
        <p>Created by Command Line Crusaders</p>
        <p>Modern Web Development Spring 2022</p>
      </footer>
    </div>
    
  );
};
