import { useSession } from 'next-auth/react';
import { useState } from 'react';
import PhoneAuthModal from './modal/PhoneAuthModal';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [openPhoneAuthModal, setOpenPhoneAuthModal] = useState(false);
    return (
        <div id="layout" className="">
            <PhoneAuthModal
                isOpen={openPhoneAuthModal}
                setIsOpen={setOpenPhoneAuthModal}
            />
            <header>
                <div className="top-0 w-full z-10 bg-slate-700 bg-opacity-60 backdrop-filter backdrop-blur-lg">
                    <div className="flex flex-row justify-between py-2 px-4 sm:px-16 lg:px-24 items-center ">
                        <p className="text-2xl">Comviz</p>
                        {session ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => setOpenPhoneAuthModal(true)}
                            >
                                login
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => setOpenPhoneAuthModal(true)}
                            >
                                logout
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <main className="mt-2 px-4 sm:px-16 lg:px-24">{children}</main>
        </div>
    );
}
