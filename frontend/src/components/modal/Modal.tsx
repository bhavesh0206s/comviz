/* eslint-disable @typescript-eslint/no-use-before-define */
export default function Modal({
    isOpen,
    setIsOpen,
    children,
    title,
    onClose,
}: {
    title: string;
    isOpen: boolean;
    children: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose?: () => void;
}) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed z-10 inset-0 overflow-y-auto w-full h-full"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                    ></div>
                    <div
                        className="absolute left-1/4 top-1/4 transform translate-y-1/2 translate-x-1/2"
                        style={{ width: '27em', maxHeight: '80vh' }}
                    >
                        <div className="rounded-lg flex justify-center items-cente">
                            <div className="modal-box">
                                <div className="flex flex-row justify-between pb-4">
                                    <h3 className="font-bold text-lg">
                                        {title}
                                    </h3>
                                    <CrossIcon
                                        onClick={() => {
                                            setIsOpen(false);
                                            onClose();
                                        }}
                                    />
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export const CrossIcon = ({ onClick }: { onClick: () => void }) => (
    <svg
        onClick={onClick}
        className="cursor-pointer"
        width="28"
        height="26"
        viewBox="0 0 29 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="30" height="30" rx="15" fill="#E2E2E2" />
        <path
            d="M16.6434 14.999L21.6552 9.99813C21.8747 9.77862 21.998 9.48091 21.998 9.17048C21.998 8.86005 21.8747 8.56233 21.6552 8.34282C21.4358 8.12332 21.1381 8 20.8277 8C20.5173 8 20.2196 8.12332 20.0002 8.34282L15 13.3554L9.99983 8.34282C9.78036 8.12332 9.48268 8 9.1723 8C8.86191 8 8.56424 8.12332 8.34476 8.34282C8.12529 8.56233 8.00199 8.86005 8.00199 9.17048C8.00199 9.48091 8.12529 9.77862 8.34476 9.99813L13.3566 14.999L8.34476 19.9999C8.23552 20.1083 8.14881 20.2372 8.08964 20.3792C8.03047 20.5213 8 20.6736 8 20.8275C8 20.9814 8.03047 21.1338 8.08964 21.2758C8.14881 21.4179 8.23552 21.5468 8.34476 21.6552C8.45312 21.7644 8.58203 21.8512 8.72406 21.9103C8.86609 21.9695 9.01843 22 9.1723 22C9.32616 22 9.47851 21.9695 9.62054 21.9103C9.76257 21.8512 9.89148 21.7644 9.99983 21.6552L15 16.6427L20.0002 21.6552C20.1085 21.7644 20.2374 21.8512 20.3795 21.9103C20.5215 21.9695 20.6738 22 20.8277 22C20.9816 22 21.1339 21.9695 21.2759 21.9103C21.418 21.8512 21.5469 21.7644 21.6552 21.6552C21.7645 21.5468 21.8512 21.4179 21.9104 21.2758C21.9695 21.1338 22 20.9814 22 20.8275C22 20.6736 21.9695 20.5213 21.9104 20.3792C21.8512 20.2372 21.7645 20.1083 21.6552 19.9999L16.6434 14.999Z"
            fill="#121212"
        />
    </svg>
);
