import axios from 'axios';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Loading from '../Loading';
import Modal from './Modal';

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
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [graphTitle, setGraphTitle] = useState('');
    const onSubmit = async () => {
        setIsLoading(true);
        console.log({ query, id: uuid(), data, username, graphTitle });
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
