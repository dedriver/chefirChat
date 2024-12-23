import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function SideMenu() {
    const [activeMenu, setActiveMenu] = useState(false);
    const userDataResp = useSelector(state => state.dataSlice.userInfo);

    useEffect(() => {
        console.log('loadingUserData' ,userDataResp);
    }, []);
    return (
        <div>
            {activeMenu ? (
                <div>
                    <div className="bg-fone h-screen w-52 p-4 flex flex-col justify-between">
                        <div>
                            <button
                                onClick={() => setActiveMenu(!activeMenu)}
                                className="text-white text-3xl mb-4"
                            >
                                <CiMenuBurger
                                    className={activeMenu ? '' : 'transform rotate-90'}
                                />
                            </button>
                            <div className={'flex flex-col items-start space-y-1 mt-4'}>
                                <img
                                    src={userDataResp.photoURL || "https://via.placeholder.com/150"}
                                    alt="User"
                                    className="w-20 h-20 rounded-full mb-4"
                                />
                                <p className="text-white font-bold text-1xl mb-4">
                                      {userDataResp.displayName || "no name"}
                                </p>
                            </div>
                            <div className={`space-y-4 mt-6 ${activeMenu ? 'block' : 'hidden'} font-mono`}>
                                <div
                                    className="flex border-2 border-castomGray space-x-4  bg-castomGray rounded-[10px] p-2 items-center text-white hover:bg-castomGrayHover hover:border-fone hover:text-white">
                                    <IoChatbubbleEllipsesOutline className=" text-2xl mr-2"/>
                                    <span>Chat</span>
                                </div>
                                <div className="flex border-2 border-castomGray space-x-4 bg-castomGray rounded-[10px] p-2 items-center text-white hover:bg-castomGrayHover hover:border-fone hover:text-white">
                                    <MdGroups className="text-2xl mr-2"/>
                                    <span>Groups</span>
                                </div>
                                <div className="flex border-2 border-castomGray space-x-4 bg-castomGray rounded-[10px] p-2 items-center text-white hover:bg-castomGrayHover hover:border-fone hover:text-white">
                                    <FaRegUserCircle className="text-2xl mr-2"/>
                                    <span>Profile</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="w-full bg-red-700 text-black py-2 rounded-lg hover:bg-yellow-500 focus:ring focus:ring-yellow-300"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="bg-fone h-screen w-max p-4 flex flex-col justify-between">
                        <div>
                            <button
                                onClick={() => setActiveMenu(!activeMenu)}
                                className="text-white  pl-2 text-3xl mb-4"
                            >
                                <CiMenuBurger
                                    className={activeMenu ? '' : 'transform rotate-90'}
                                />
                            </button>

                            <div className="space-y-9 mt-6 text-white text-3xl mb-4">
                                <div className={'border p-2 rounded-[100%] border-fone hover:border-castomGray hover:bg-castomGray'}>
                                    <CiMenuBurger />
                                </div>
                                <div className={'border p-2 rounded-[100%] border-fone hover:border-castomGray hover:bg-castomGray'}>
                                <MdGroups />
                                </div>
                                    <div className={'border p-2 rounded-[100%] border-fone hover:border-castomGray hover:bg-castomGray'}>
                                <IoChatbubbleEllipsesOutline />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
