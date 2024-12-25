import MassageItem from "./MassageItem.jsx";
import { sendMessage } from "../../API/sendMassage.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";

export default function ChatBox() {
    const myMessage = useSelector((state) => state.dataSlice.myMessage);
    const currentUSERresp = useSelector((state) => state.dataSlice.currentUser);
    const userDataResp = useSelector((state) => state.dataSlice.userInfo);
    const userInfo = useSelector((state) => state.dataSlice.userInfo);
    const [messageText, setMessageText] = useState("");
    const [renderMessages, setRenderMessages] = useState([]);

    const formatTimestamp = (timestamp) => {
        if (timestamp instanceof Timestamp) {
            return timestamp.toDate().toLocaleString();
        }
        return new Date(timestamp).toLocaleString();
    };
    useEffect(() => {
        console.log('new' , myMessage)
    }, [myMessage]);
    const handleSendMessage = () => {
        if (!messageText.trim()) {
            alert("Please enter a message");
            return;
        }
        if (!currentUSERresp?.Ruid) {
            alert("No recipient selected");
            return;
        }

        sendMessage(userInfo.uid, currentUSERresp.Ruid, {
            name: userInfo.displayName || "Anonymous",
            senderId: userInfo.uid,
            receiverId: currentUSERresp.Ruid,
            text: messageText,
            photoUrl: userInfo.photoURL || "",
            timestamp: new Date().toISOString(),
        });
        setMessageText("");
    };

    useEffect(() => {
        if (myMessage && myMessage.messages) {
            const updatedMessages = myMessage.messages
                .map((message) => {
                    // Додаємо поле "my" для своїх повідомлень
                    if (message.name === userDataResp.displayName) {
                        return { ...message, my: true };
                    }
                    return message;
                })
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Сортуємо від старого до нового

            setRenderMessages({
                ...myMessage,
                messages: updatedMessages,
            });
        }
    }, [myMessage]);

    console.log(renderMessages.messages);
    return (
        <div className="h-full flex flex-col">
            <div
                className="mt-3 p-2 rounded-[10px] overflow-auto custom-scrollbar overflow-y-scroll bg-[#111111]"
                style={{ height: "400px" }}
            >
                {renderMessages && renderMessages.messages?.map((msg, index) => (
                    <div className={`flex ${msg.my ? 'justify-end' : 'justify-start'} w-full`} key={index}>
                        <MassageItem
                            my={msg.my}
                            name={msg.name}
                            text={msg.text}
                            timestamp={formatTimestamp(msg.timestamp)}
                        />
                    </div>
                ))}
            </div>
            <div className="flex space-x-3 mt-4">
                <input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    type="text"
                    placeholder="Type your message"
                    className="w-full bg-[#141414] text-white font-[roboto] font-semibold rounded-[10px] px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 bg-green-500 w-20 h-12 rounded-[10px] text-white font-bold hover:bg-green-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
