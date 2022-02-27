/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src/components/Layout';
import { DashboardInterface } from 'src/types';
import { getDashboards } from 'src/utils/storage';

export default function Dashboard() {
    const router = useRouter();
    const [dashboards, setDashboards] = useState<DashboardInterface[]>();
    useEffect(() => {
        if (router.isReady) {
            const data = getDashboards();
            setDashboards(data);
        }
    }, [router]);
    return (
        <Layout>
            <div className="min-h-screen">
                <p className="text-2xl py-4">Dashboard</p>
                <ul className="menu bg-gray-800 menu-compact lg:menu-normal p-2 rounded-box">
                    {dashboards?.map((item, i) => (
                        <li key={i}>
                            <Link href={`/dashboard/${item.id}`} passHref>
                                <div>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                src={item.cover}
                                                alt="proifle"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>{item.title}</p>
                                        <p className="text-sm">
                                            Created by: @{item.username}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}
