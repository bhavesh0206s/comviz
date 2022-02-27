import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Loading from '../Loading';
import Modal from './Modal';

import { useRouter } from 'next/router';

import { storeDashboard } from 'src/utils/storage';
import { DashboardInterface } from 'src/types';

export default function GraphSaveModal({
    isOpen,
    setIsOpen,
    query,
    data,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    query: string;
    data: any[];
}) {
    const route = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [graphTitle, setGraphTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const id = uuid();
        const queryPage: DashboardInterface = {
            id,
            timestamp: new Date().getTime(),
            title: graphTitle,
            cover: 'https://api.lorem.space/image/album?w=150&h=150',
            username: username,
            query: query,
            data: data,
        };

        try {
            await storeDashboard(queryPage);
            const result = confirm('Go to dashboard');
            if (result) route.push(`/dashboard/${id}`);
        } catch (err) {
            console.log(err);
            alert(
                `Uh oh! Error encountered, we are looking in it. Please try after sometime.`,
            );
        }

        setIsLoading(false);
    };

    return (
        <Modal title="Save your work" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="form-control w-full">
                <form action="" onSubmit={onSubmit}>
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Type here"
                        value={username}
                        required
                        className="input input-bordered w-full"
                    />
                    <label className="label">
                        <span className="label-text">Graph title</span>
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setGraphTitle(e.target.value)}
                        placeholder="Type here"
                        value={graphTitle}
                        required
                        className="input input-bordered w-full"
                    />
                    {!isLoading ? (
                        <button type="submit" className="btn mt-4 w-full">
                            Save
                        </button>
                    ) : (
                        <Loading />
                    )}
                </form>
            </div>
        </Modal>
    );
}
