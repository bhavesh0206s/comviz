export default function Loading({
    title = 'Loading',
    background = 'rgba(0, 0, 0)',
}: {
    title?: string;
    background?: string;
}) {
    return (
        <div
            className="fixed inset-0 w-full h-full rounded-lg"
            style={{ background, zIndex: 1000000 }}
        >
            <div className="absolute left-2/4 top-2/4  transform -translate-x-2/4 -translate-y-2/4">
                <Loader title={title} color="text-white" />
            </div>
        </div>
    );
}

export function Loader({
    className = '',
    color = 'text-gray-700',
    title = 'Loading',
}: {
    className?: string;
    color?: string;
    title?: string;
}) {
    return (
        <div
            className={` flex justify-center items-center space-x-1 text-sm ${color} ${className} `}
        >
            <svg
                fill="none"
                className="w-7 h-7 animate-spin"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clipRule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fillRule="evenodd"
                />
            </svg>

            <p className="text-base font-medium">{`${title} ...`} </p>
        </div>
    );
}
