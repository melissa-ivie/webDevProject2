import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { useNavigate } from 'react-router';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { Message } from '../common/message';

export const ChatPage = () => {
  const api = useContext(ApiContext);
  var userName = "";
  var chatMessages = [];
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const chatroom = sessionStorage.getItem("selectedChat");
  var currentTime = new Date();

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  //get messages
  useEffect(async () => {
    const res = await api.get('/messages');
    setMessages(res.messages);
  }, []);

  //Retrieve all messages for this chat
  const getMessages = () => {
    chatMessages = [];
    let messObj = {};
    for(const message in messages){
      let currentMessage = messages[message];
      let cID = currentMessage.id;
      console.log(currentMessage)
      let room = currentMessage.chatroom;
      if((chatroom == room)&&(currentMessage.content != null)){
        messObj[cID] = currentMessage;
      }
    }
    chatMessages = Object.assign(chatMessages,messObj)
  };
  
  if(user!=null){
    userName = user.firstName;
  }

  if(messages!=null){
    console.log(messages);
    getMessages();
  }

  const addNewMessage = async () => {
    let content = newMessage;
    fetch('/message', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatroom,
            userName,
            content,
        })
    })
    setNewMessage("");
    window.location.reload(false);
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <div className='page'>
      <Header text={chatroom}></Header>
      <div className='pageBody'>
        {chatMessages.map((mes) => {
              return <div>
                <Message content={mes.content} name={mes.userName}/>
              </div>
        })}
          <Input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
              <Button type="button" onClick={addNewMessage}>
                Send
              </Button>
      </div>
      </div>
      <footer>
        <p>Created by Command Line Crusaders</p>
        <p>Modern Web Development Spring 2022</p>
      </footer>
    </div>
    
  );
};
