import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import Layout from 'src/components/Layout';
import PhoneAuthModal from 'src/components/modal/PhoneAuthModal';

import styles from 'src/styles/Home.module.css';

export default function Home() {
    return (
        <Layout>
            <div className={styles.container}>
                <div className=" absolute h-full inset-0 -z-50" />
                <div className="hero min-h-screen">
                    <div className=" bg-opacity-60"></div>
                    <div className="text-center hero-content text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-8xl font-bold">Comviz</h1>
                            <p className="mb-5">
                                Provident cupiditate voluptatem et in. Quaerat
                                fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id
                                nisi.
                            </p>
                            <Link href={'/dashboard'} passHref>
                                <button className="btn btn-primary">
                                    Discover
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
