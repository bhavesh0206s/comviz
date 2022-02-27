/* eslint-disable @next/next/no-img-element */

import Layout from 'src/components/Layout';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Profile() {
    return (
        <Layout>
            <div className="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
                <div className="top h-64 w-full bg-blue-600 overflow-hidden relative">
                    <img
                        src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                        className="bg w-full h-full object-cover object-center absolute z-0"
                    />
                    <div className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                            className="h-24 w-24 object-cover rounded-full"
                            alt="profile photo"
                        />
                        <h1 className="text-2xl font-semibold">
                            Antonia Howell
                        </h1>
                        <h4 className="text-sm font-semibold">
                            Joined Since '19
                        </h4>
                    </div>
                </div>
                <div className="grid grid-cols-12 bg-white ">
                    <div className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
                        <a
                            href="#"
                            className="text-sm p-2 bg-indigo-900 text-white text-center rounded font-bold"
                        >
                            Basic Information
                        </a>

                        <a
                            href="#"
                            className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200"
                        >
                            Another Information
                        </a>

                        <a
                            href="#"
                            className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200"
                        >
                            Another Something
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
