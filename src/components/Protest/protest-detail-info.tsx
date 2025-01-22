export default function ProtestDetailInfo({ name, info }: { name: string; info: string }) {
    return (
        <div className="w-full">
            <p className="mx-auto mb-1 w-[85%] min-w-[240px] text-zinc-600 text-xs">{name}</p>
            <p className="p-2 mx-auto rounded-md w-[85%] min-w-[240px] bg-background-white shadow-md round-xs text-xs">
                <span>{info}</span>
            </p>
        </div>
    );
}
