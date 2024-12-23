import StartPage from "./Pages/StartPage.jsx";
import Headers from "./Components/Headers.jsx";

import {routes} from "./Router/Router.jsx";
import {RouterProvider} from "react-router-dom";

export default function App(){

    return <div className={'bg-fone'}>
        <Headers/>
    <RouterProvider router={routes} >
            <StartPage/>
    </RouterProvider>
    </div>
}