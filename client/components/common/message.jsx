import { Button } from './button';


export const Message = (props) => {
    
    var name = props.name;
    var content = props.content;

    return (
        <div>
            <p>{name}</p>
            <div className="messagebox">
                {content}  
            </div>
        </div>
        );
    
  };