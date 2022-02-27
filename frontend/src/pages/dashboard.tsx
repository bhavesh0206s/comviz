/* eslint-disable @next/next/no-img-element */
import Layout from 'src/components/Layout';

export default function Dashboard() {
    return (
        <Layout>
            <p className="text-xl pb-2">Dashboard</p>
            <ul className="menu bg-gray-800 menu-compact lg:menu-normal p-2 rounded-box">
                <li>
                    <div>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://api.lorem.space/image/car?hash=92310" />
                            </div>
                        </div>
                        <p>My graph</p>
                    </div>
                </li>
                <li>
                    <div>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://api.lorem.space/image/car?hash=92310" />
                            </div>
                        </div>
                        <p>My graph</p>
                    </div>
                </li>
                <li>
                    <div>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://api.lorem.space/image/car?hash=92310" />
                            </div>
                        </div>
                        <p>My graph</p>
                    </div>
                </li>
            </ul>
        </Layout>
    );
}
