import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const fetchChatsForUser = (userId, callback) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        console.log('Починаємо шукати чати для користувача', userId);

        const chatsRef = collection(db, "chats");  // Збираємо чати
        const q = query(chatsRef, where("participants", "array-contains", userId));  // Перевірка, чи є userId серед учасників

        // Використовуємо onSnapshot для підписки на зміни в чатах
        const unsubscribeChats = onSnapshot(q, async (querySnapshot) => {
            console.log('Знайдено чати, обробляємо...');

            // Масив для зберігання всіх чатів для користувача
            const chats = [];
            querySnapshot.forEach((doc) => {
                console.log('Обробляється чат з ID:', doc.id);

                const chatData = doc.data();

                // Тепер перевіряємо всі повідомлення в чату
                const messagesRef = collection(db, `chats/${doc.id}/messages`);
                const unsubscribeMessages = onSnapshot(messagesRef, (messageSnapshot) => {
                    const messages = [];
                    messageSnapshot.forEach((messageDoc) => {
                        const messageData = messageDoc.data();
                        messages.push({
                            text: messageData.text,
                            senderId: messageData.senderId,
                            timestamp: messageData.timestamp,
                            name: messageData.name,
                            receiverId: messageData.receiverId,
                            photoUrl: messageData.photoUrl,
                        });
                    });

                    console.log(`Знайдено ${messages.length} повідомлень в чаті з ID: ${doc.id}`);

                    // Додаємо чат з повідомленнями до масиву
                    chats.push({
                        chatId: doc.id,
                        participants: chatData.participants,
                        messages: messages
                    });

                    // Викликаємо колбек з оновленими чатами
                    callback(chats);

                    console.log('Чати передано через колбек:', chats);
                });

                // Важливо: очищаємо підписку на повідомлення, коли чат більше не потрібен
                return () => unsubscribeMessages();
            });
        });

        // Важливо: очищаємо підписку на чати, коли компонент буде демонтуватися
        return () => {
            console.log('Очищаємо підписку на чати');
            unsubscribeChats();
        };
    } else {
        console.error("Користувач не авторизований");
    }
};
