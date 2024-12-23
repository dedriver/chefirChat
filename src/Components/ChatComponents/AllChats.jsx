import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebaseConfig.js";
import { collection, doc, updateDoc, arrayUnion, onSnapshot, getDoc } from "firebase/firestore";
import { addcurrentUser, setMyMessage } from "../../store/DataSlice.js";
import AllUserItem from "./AllUserItem.jsx";
import AboutChat from "./AboutChat.jsx";
import {addUser} from '../../API/AddUser.js'
import {sendMessage} from "../../API/sendMassage.jsx";
import {fetchChatsForUser} from "../../API/fetchChatsForUser.js";

/*Потрібно зробити щоб овідолення скорочувалося при зміні екрану ширини , і додати фото повідомлення з лопопмогою Fetch masedg and send*/

export default function AllChats() {
    const userDataResp = useSelector(state => state.dataSlice.userInfo);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (userDataResp && userDataResp.uid) {  // Перевірка на наявність uid
            fetchChatsForUser(userDataResp.uid, (fetchedChats) => {
                setChats(fetchedChats);  // Оновлення стану чату
            });
        }
    }, [userDataResp]);  // Залежить від userDataResp

    console.log(chats);  // Вивести чати в консолі
    return (
        <div className="w-full h-screen bg-[#111111] flex flex-row">
            <div className="w-[50%] h-screen flex flex-col space-y-4 overflow-auto custom-scrollbar overflow-y-scroll text-white p-4 items-center">
                {chats.map((e)=>(
                  e.messages.map((chat) => (
                       <AllUserItem name={chat.name} lastMessage={chat.text} />
                   ))
                ))}
            </div>
            <div className={"w-[50%]"}>

                    <AboutChat  />

            </div>
        </div>
    );
}
