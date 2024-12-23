export default function AllUserItem({ name, photo, lastMessage, click }) {
    return (
        <div
            className={"w-[100%] h-20 flex justify-between items-center px-4 text-gray-200"}
            onClick={click}
        >
            <div className={"flex flex-row space-x-10 items-center "}>
                <div className={"border border-white rounded-[100%] w-12 h-12"}>
                    <img
                        className={"border border-white rounded-[100%] w-12 h-12"}
                        src={photo}
                        alt={photo}
                    />
                </div>
                <div>
                    <p className={"font-[roboto] font-semibold text-xl"}>{name}</p>
                    <p>{lastMessage}</p>
                </div>
            </div>
            <div className={"flex flex-col items-center space-y-1"}>
                <p>13:12</p>
                <p className={"bg-green-500 px-1 rounded-[3px]"}>5</p>
            </div>
        </div>
    );
}
