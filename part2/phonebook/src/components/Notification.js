import React from 'react'

const Notification =(props) => {
    const {message,
        setMessage}=props;
    const style = {
        color: message.type?"red":"green",
        background: "lightGrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };
        
    if (message.text === "" || message.text ===null) return null;

    setTimeout(() => setMessage({text:"",type:false}), 5000);

    return (
        <div style={style}>
            {message.text}
        </div>
    )
}

export default Notification;