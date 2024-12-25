import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { addUser } from "../API/AddUser.js";
import {useDispatch, useSelector} from "react-redux";
import {addUserInfo} from "../store/DataSlice.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9k8GDXbmvoUNHcDp37-btDzaCWQ3foy0",
    authDomain: "chat-app-b1c95.firebaseapp.com",
    projectId: "chat-app-b1c95",
    storageBucket: "chat-app-b1c95.firebasestorage.app",
    messagingSenderId: "620860256772",
    appId: "1:620860256772:web:a3595728e608212f63bb51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function StartPage() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const userDataResp = useSelector(state => state.dataSlice.userInfo);
    const dispatch = useDispatch();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Sign-in error:", err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Sign-out error:", err);
        }
    };

    useEffect(() => {
        if (user) {
            const userData = {
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                uid: user.uid || '',
                email: user.email || '',
            };
            addUser(userData);
            dispatch(addUserInfo(userData));
        }
    }, [user]);

    useEffect(() => {
        console.log('userDataResp', userDataResp);
    }, [userDataResp]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                    {userDataResp ? `Welcome, ${userDataResp.displayName || "User"}` : "Sign In"}
                </h2>

                {user ? (
                    <div className="text-center space-y-4">
                        <img
                            src={userDataResp?.photoURL || "https://via.placeholder.com/150"}
                            alt="User"
                            className="w-20 h-20 mx-auto rounded-full mb-4"
                        />
                        <p className="text-lg text-gray-700 mb-4">
                            You are logged in as {userDataResp?.email || "unknown email"}
                        </p>
                        <button
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
                            onClick={() => navigate('/MainPage')}
                        >
                            Start
                        </button>
                        <button
                            onClick={logOut}
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <p className="text-center text-sm text-gray-600">Or sign in with</p>
                        <button
                            onClick={signInWithGoogle}
                            className="mt-4 w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300"
                        >
                            Google
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
