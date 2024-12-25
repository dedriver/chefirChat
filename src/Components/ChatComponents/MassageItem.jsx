export default function MassageItem({ my, text, timestamp }) {
    const back = my ? 'bg-green-500 text-white self-end' : 'bg-gray-100 text-black self-start';

    return (
        <div
            className={`${back} flex flex-col mt-4  p-3 max-w-[200px] rounded-[10px] font-roboto font-semibold break-words shadow-sm`}
            style={{ wordWrap: 'break-word' }}
        >
            <p className="mb-1">{text}</p>
            <p className="text-xs opacity-70 text-right">{timestamp}</p>
        </div>
    );
}
