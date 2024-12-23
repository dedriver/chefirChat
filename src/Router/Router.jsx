import {createBrowserRouter} from "react-router-dom";
import MainPage from "../Pages/MainPage.jsx";
import StartPage from "../Pages/StartPage.jsx";

export const routes = createBrowserRouter([
    { path: "/MainPage", element: <MainPage />},
    { path : "/",  element: <StartPage />},
])