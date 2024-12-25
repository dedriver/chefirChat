import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatsForUser } from "../../API/fetchChatsForUser.js";
import AllUserItem from "./AllUserItem.jsx";
import AboutChat from "./AboutChat.jsx";
import { addcurrentUser, setMyMessage } from "../../store/DataSlice.js";
import { Timestamp } from "firebase/firestore";

const DEFAULT_PHOTO_URL = "default-photo-url.jpg";

const convertMessages = (messages) => {
    return messages.map((message) => ({
        ...message,
        timestamp: message.timestamp instanceof Timestamp
            ? message.timestamp.toDate().toISOString()
            : message.timestamp,
    }));
};

export default function AllChats() {
    const userDataResp = useSelector((state) => state.dataSlice.userInfo);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const dispatch = useDispatch();
    const [chatID, setChatID] = useState('');  // Використовуємо useState для chatID

    const currentUSERResp = useSelector((state) => state.dataSlice.currentUser);

    useEffect(() => {
        if (userDataResp?.uid) {
            fetchChatsForUser(userDataResp.uid, setChats);
        }
    }, [userDataResp]);

    useEffect(() => {
        console.log('chatResp' , chats)
    }, [chats]);

    const createCurrendUSER = (user, chatID) => {
        dispatch(addcurrentUser(user));
        setChatID(chatID);
    };

    useEffect(() => {
        const selectedChat = chats.find((chat) => chat.chatId === chatID);

        if (selectedChat) {
            const processedMessages = convertMessages(selectedChat.messages);

            dispatch(setMyMessage({ ...selectedChat, messages: processedMessages }));
            setCurrentChat({ ...selectedChat, messages: processedMessages });
        } else {
            console.error("Chat not found for chatID:", chatID);
            // Тут ви можете додати логіку для обробки ситуації, коли чат не знайдений.
        }
    }, [chatID, chats]);


    const filterUser = chats
        .map((chat) => {
            const filteredMessages = chat.messages
                ?.filter((message) => message.senderId !== userDataResp.uid)
                ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            const lastMessage = filteredMessages?.[0];
            if (lastMessage) {
                return {
                    ...lastMessage,
                    chatId: chat.chatId,
                    messageCount: filteredMessages.length,
                    photoURL: chat.photoURL || DEFAULT_PHOTO_URL,
                };
            }
            return null;
        })
        .filter(Boolean);

    const totalMessageCount = filterUser.reduce((total, chat) => total + chat.messageCount, 0);

    return (
        <div className="w-full h-screen bg-[#111111] flex flex-row">
            <div className="w-full md:w-1/2 h-screen flex flex-col space-y-4 overflow-auto custom-scrollbar overflow-y-scroll text-white p-4 items-center">
                {filterUser.map((chat) => (
                    <AllUserItem
                        count={chat.messageCount}
                        photo={chat.photoURL}
                        key={chat.chatId}
                        name={chat.name}
                        lastMessage={chat.text}
                        chatId={chat.chatId}
                        click={() =>
                            createCurrendUSER(
                                {
                                    name: userDataResp.displayName,
                                    Ruid: chat.senderId,
                                },
                                chat.chatId
                            )
                        }
                    />
                ))}
            </div>
            <div className="w-1/2 hidden md:block">{
                filterUser.map((chat) => (
                    <AboutChat
                        name={chat.name}
                        photo={chat.photoURL}
                    />
                ))
            }
            </div>
        </div>
    );
}