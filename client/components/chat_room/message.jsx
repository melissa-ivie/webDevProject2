
export const Message = ({ message }) => {
  uid = parseInt(sessionStorage.getItem("uID"));
  
  if(uid == message.userId){
    return (
      <div className="meMessage">
        <h3 className="user-name">{message.userName}</h3>
        <div className="meTextBox">{message.contents}</div>
      </div>
    );
  }else{
    return (
      <div className="message">
        <h3 className="user-name">{message.userName}</h3>
        <div className="textBox">{message.contents}</div>
      </div>
    );
  }
};
