import MassageItem from "./MassageItem.jsx";
import { updateMessage } from "../../API/CreateMassage.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig.js";
import {sendMessage} from '../../API/sendMassage.jsx'

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const userInfo = useSelector((state) => state.dataSlice.userInfo);
    const currentUser = useSelector((state) => state.dataSlice.currentUser);

    function send(){
        sendMessage(userInfo.uid, 'test3', {
            name : userInfo.displayName || '',
            senderId: userInfo.uid,
            receiverId: 'test3',
            text: 'Привіт! Це нове повідомлення.'
        });
    }

    return (
        <div className="h-full flex flex-col">
            <div
                className="mt-3 p-2 rounded-[10px] overflow-auto custom-scrollbar overflow-y-scroll"
                style={{ height: "400px" }}
            >
            </div>
            <div className="flex space-x-3 mt-4">
                <input
                    value={messages}
                    onChange={(e) =>setMessages(e.target.value)}
                    type="text"
                    placeholder="Type your message"
                    className="w-full bg-[#141414] text-white font-[roboto] font-semibold rounded-[10px] px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={send}
                    className="px-4 bg-green-500 w-20 h-12 rounded-[10px] text-white font-bold hover:bg-green-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}