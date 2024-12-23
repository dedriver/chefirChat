import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const fetchChatsForUser = async (userId, callback) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const chatsRef = collection(db, "chats");  // Збираємо чати
        const q = query(chatsRef, where("participants", "array-contains", userId));  // Перевірка, чи є userId серед учасників

        const querySnapshot = await getDocs(q);

        // Масив для зберігання всіх чатів для користувача
        const chats = [];
        for (const doc of querySnapshot.docs) {
            const chatData = doc.data();

            // Тепер перевіряємо всі повідомлення в чату
            const messagesRef = collection(db, `chats/${doc.id}/messages`);
            const messageSnapshot = await getDocs(messagesRef);  // Використовуємо getDocs замість .get()

            const messages = [];
            messageSnapshot.forEach((messageDoc) => {
                const messageData = messageDoc.data();
                messages.push({
                    text: messageData.text,
                    senderId: messageData.senderId,
                    timestamp: messageData.timestamp,
                    name : messageData.name
                });
            });

            // Додаємо інформацію про чат та повідомлення
            chats.push({
                chatId: doc.id,
                participants: chatData.participants,
                messages: messages
            });
        }

        // Викликаємо колбек для передачі чату в компонент
        callback(chats);
    } else {
        console.error("Користувач не авторизований");
    }
};
