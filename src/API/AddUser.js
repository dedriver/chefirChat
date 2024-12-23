import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const addUser = async (user) => {
    try {
        const userRef = doc(db, "users", user.uid); // Посилання на документ користувача
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName || "Unknown",
                email: user.email,
                photo : user.photoURL,
                profilePic: user.photoURL || "",
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
            });
            console.log("Новий користувач доданий до бази даних.");
        } else {
            await setDoc(
                userRef,
                { lastLogin: serverTimestamp() },
                { merge: true } // Оновлюємо лише конкретні поля
            );
            console.log("Час останнього входу оновлено.");
        }
    } catch (error) {
        console.error("Помилка під час обробки користувача:", error);
    }
};
