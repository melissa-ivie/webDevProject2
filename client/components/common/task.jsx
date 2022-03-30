import { Button } from '../common/button';


export const Task = (props) => {
    
    var id = props.id;
    var user = props.user; 
    var assignee = props.assignee;
    var status = props.status;
    var changeTaskStatus = async () => {
        sessionStorage.setItem("refreshProject", "T")
        if(status == false){
            status = true; 
        }
        fetch('/updateTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                status, 
            })
        })

        window.location.reload(false);
    };

    if(status == false){
        if(user.email == assignee){
            return (
                <div className="task">
                    <h5 className='taskTitle'>{props.title}</h5>
                    <p>Description: {props.description}</p>
                    <p>Estimated Time: {props.time}</p>
                    <p>Assigned User: {assignee}</p>
                    <Button type="button" onClick={changeTaskStatus}>
                      Mark Task as Complete
                    </Button>
                </div>
            );
        }else{
            return (
                <div className="task">
                    <h5 className='taskTitle'>{props.title}</h5>
                    <p>Description: {props.description}</p>
                    <p>Estimated Time: {props.time}</p>
                    <p>Assigned User: {assignee}</p>
                </div>
            );
        }

    }else{
        return (
            <div className="task">
                <h5 className='taskTitle'>{props.title}</h5>
                <p>Description: {props.description}</p>
                <p>Estimated Time: {props.time}</p>
                <p>Assigned User: {assignee}</p>
            </div>
        );

    }
    
  };