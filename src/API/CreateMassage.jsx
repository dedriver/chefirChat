import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

// Функція для оновлення повідомлення всередині масиву `message`
export const updateMessage = async (uid, newMessage) => {
    try {
        const userDocRef = doc(db, 'users', uid);  // UID користувача

        // Оновлюємо масив `message`, додаючи нове повідомлення
        await updateDoc(userDocRef, {
            message: arrayUnion(newMessage), // Додаємо нове повідомлення до масиву `message`
        });

        console.log("Message added successfully to 'message'");
    } catch (error) {
        console.error('Error updating message: ', error);
    }
};
