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

  //get messages
  useEffect(async () => {
    const res = await api.get('/messages');
    setMessages(res.messages);
  }, []);


  const navigate = useNavigate();

  const goToDashboard = () => {
    sessionStorage.setItem("selectedProject", "None");
    navigate('/');
  };

  //Creates list of all tasks for the project
  const getTasks = () => {
    incompleteProjectTasks = [];
    completeProjectTasks = [];
    let itasksObj = {};
    let ctasksObj = {};
    for(const task in tasks){
      let currentTask = tasks[task];
      let taskID = currentTask.id;
      if((currentTask.projectID == projectID)){
        if(currentTask.status){
          ctasksObj[taskID] = currentTask;
        }else{
          itasksObj[taskID] = currentTask;
        }
      }
    }
    incompleteProjectTasks = Object.assign(incompleteProjectTasks,itasksObj)
    completeProjectTasks = Object.assign(completeProjectTasks,ctasksObj)
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <div className='page'>
      <Header text={projectName}></Header>
      <div className='pageBody'>
        <h3 className='projectTitle'>Tasks for {projectName}</h3>
        <Button className="return" type="button" onClick={goToDashboard}> Return To Project Dashboard </Button>
        <Button className="add" type="button" onClick={goToNewTaskPage}>Add Task</Button>
        <div className='taskList'>{getTasks()}
          <div className='incompleteTask'> <h5 className='taskCategory'>Incomplete Tasks:</h5>
              {incompleteProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status}projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                })}
          </div>
          <div className='completeTask'>  <h5 className='taskCategory'>Completed Tasks:</h5>
              {completeProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status} projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                })}
          </div>
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
