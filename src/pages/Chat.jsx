import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const photoUrl = user?.photoUrl;
  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        photoUrl: senderId?.photoUrl,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    // join chat room
    socket.emit("joinChat", { firstName, userId, targetUserId });

    // listen for incoming messages
    socket.on("messageReceived", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, firstName]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      photoUrl: user?.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">
      <div className="w-full max-w-md h-[620px] bg-[#0b1220]/90 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg">
            {firstName?.[0]}
          </div>

          <div className="flex-1">
            <p className="text-white font-medium tracking-wide">{firstName}</p>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : " chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={msg.photoUrl} />
                </div>
              </div>

              <div className="chat-header text-amber-50">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50 ml-2">now</time>
              </div>

              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-blue-600 hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
