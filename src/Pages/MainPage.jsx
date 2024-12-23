import SideMenu from "../Components/SideMenu.jsx";
import AllChats from "../Components/ChatComponents/AllChats.jsx";

export default function MainPage(){
    return <div className={'flex flex-row'}>
        <SideMenu/>
        <AllChats />
    </div>
}