import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

// Функція для створення чату
const createChat = async (userId1, userId2) => {
    try {
        const chatsRef = collection(db, "chats");

        // Перевірка чату між userId1 і userId2
        const q = query(
            chatsRef,
            where("participants", "array-contains", userId1)
        );

        const querySnapshot = await getDocs(q);

        let existingChatId = null;

        querySnapshot.forEach((doc) => {
            const chatData = doc.data();
            if (chatData.participants.includes(userId2)) {
                // Якщо chat містить обох учасників
                existingChatId = doc.id;
            }
        });

        if (!existingChatId) {
            // Якщо чат не знайдений, створюємо новий
            const chatRef = await addDoc(chatsRef, {
                participants: [userId1, userId2],
                lastMessage: "",
                lastTimestamp: null,
            });
            console.log("Чат створено!");
            return chatRef.id; // Повертаємо id нового чату
        } else {
            console.log("Чат вже існує!");
            return existingChatId; // Повертаємо id існуючого чату
        }
    } catch (error) {
        console.error("Помилка створення чату:", error);
    }
};

// Функція для надсилання повідомлення
export const sendMessage = async (userId1, userId2, message) => {
    try {
        // Перевіряємо, чи існує чат
        const chatId = await createChat(userId1, userId2);

        // Тепер можна додавати повідомлення в знайдений або новий чат
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        await addDoc(messagesRef, {
            senderId: message.senderId,
            receiverId: message.receiverId || null, // null для групових
            text: message.text,
            timestamp: serverTimestamp(),
            read: false,
            name : message.name
        });

        // Оновлюємо останнє повідомлення в чаті
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
            lastMessage: message.text,
            lastTimestamp: serverTimestamp(),
        });

        console.log("Повідомлення надіслано і чат оновлений!");
    } catch (error) {
        console.error("Помилка надсилання повідомлення:", error);
    }
};
