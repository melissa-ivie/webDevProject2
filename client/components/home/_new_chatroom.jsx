import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const NewChatroom = () => {
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(async () => {
        const res = await api.get('/users/me');
        setUser(res.user);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    

    const newChat = async () => {
        if (title === '') {
        setErrorMessage('Chatroom Name cannot be blank');
        return;
        }

        const lat = parseFloat(sessionStorage.getItem("lat"));
        const long = parseFloat(sessionStorage.getItem("long"));
        
        fetch('/chatroom', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lat,
                long,
                title,
            })
        })
        navigate('/dash');
    };

    const cancelAdd = async () => {
      navigate('/dash');
    };

  return (
    <div className="flex flex-row justify-center m-4">
      <div className="w-96">
        <Paper>
          <div>Chatroom Name</div>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={newChat}>
              Add New Chatroom
            </Button>
            <Button type="button" onClick={cancelAdd}>
              Cancel
            </Button>
          </div>
          <div className="flex">{errorMessage}</div>
        </Paper>
      </div>
    </div>
  );
};
