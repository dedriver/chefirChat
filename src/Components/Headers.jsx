import { FaPaperPlane } from "react-icons/fa";


export default function Headers(){
    return <div className={'w-full h-24 bg-fone flex items-center px-6'}>
        <div className={'flex items-center space-x-2 '}>
            <FaPaperPlane className={'text-white text-2xl'} />
            <p className={'text-white text-2xl font-mono'}>ChefirChat</p>
        </div>
    </div>
}