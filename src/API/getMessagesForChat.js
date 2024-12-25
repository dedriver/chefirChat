import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"; // Ваш Firebase конфіг

export const getMessagesForChat = async (chatId) => {
    try {
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        const q = query(messagesRef, orderBy("timestamp")); // Сортуємо за часом

        const querySnapshot = await getDocs(q);

        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data()); // Додаємо повідомлення в масив
        });

        console.log("Повідомлення для чату:", messages);
        return messages;
    } catch (error) {
        console.error("Помилка при отриманні повідомлень:", error);
    }
};

