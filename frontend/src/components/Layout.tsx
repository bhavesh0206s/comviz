import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import PhoneAuthModal from './modal/PhoneAuthModal';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [openPhoneAuthModal, setOpenPhoneAuthModal] = useState(false);
    console.log(session ? true : false);
    return (
        <div id="layout" className="">
            <PhoneAuthModal
                isOpen={openPhoneAuthModal}
                setIsOpen={setOpenPhoneAuthModal}
            />
            <header>
                <div className="navbar bg-base-100 shadow-xl py-2 px-4 sm:px-16 lg:px-24">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">
                            <Link href={'/'} passHref>
                                <p className="text-2xl cursor-pointer">
                                    Comviz
                                </p>
                            </Link>
                        </a>
                    </div>
                    <div className="flex-none">
                        <Link href={'/queries'} passHref>
                            <button className="btn btn-primary mr-5">
                                New Query
                            </button>
                        </Link>
                        {!session ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => setOpenPhoneAuthModal(true)}
                            >
                                login
                            </button>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex="0"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img src="https://api.lorem.space/image/face?hash=33791" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex="0"
                                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <Link href={'/profile/3'} passHref>
                                            <a className="justify-between">
                                                Profile
                                            </a>
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() =>
                                            signOut({ redirect: true })
                                        }
                                    >
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className=" px-4 sm:px-16 lg:px-24">{children}</main>
            <footer className="mt-24 p-10 footer bg-primary text-primary-content footer-center">
                <div>
                    <p className="text-7xl font-bold">Comvix</p>
                    <p>Copyright © 2022 - All right reserved</p>
                </div>
            </footer>
        </div>
    );
}
