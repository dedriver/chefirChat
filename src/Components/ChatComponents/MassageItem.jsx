export default function MassageItem({ my }) {
    const back = my ? 'bg-green-500' : 'bg-gray-100';

    return (
        <div className={`${back} flex  flex-col p-3 w-full max-w-[200px]  rounded-[10px] font-[roboto] font-semibold `}>
            <p className={'break-words'}>dadadafafafafdaaae</p>
            <p className={'text-xs'}>18:50</p>
        </div>
    );
}
