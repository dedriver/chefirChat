import ChatBox from "./ChatBox.jsx";
import {useSelector} from "react-redux";

export default function AboutChat({ photo, name }) {
    return (
        <div className='p-4 bg-[#101010] flex flex-col  '>
            <div className={'flex space-x-3'}>
                <div className={'border border-white rounded-[100%] w-12 h-12'}>
                    <img className={'border border-white rounded-[100%] w-12 h-12'} src={photo} alt={photo} />
                </div>
                <div className={'flex flex-col text-white items-start'}>
                    <p className={'font-[roboto] font-semibold text-xl '}>{name}</p>
                    <p className={'text-gray-300'}>+3800682306088</p>
                </div>
            </div>
            <div className={'h-[60%]'}>
                <ChatBox />
            </div>
        </div>
    );
}