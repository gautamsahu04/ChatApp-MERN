import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end text-right" : "chat-start text-left";
const chatColor = itsMe ? "bg-blue-500 text-white" : "bg-gray-300 text-black";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
