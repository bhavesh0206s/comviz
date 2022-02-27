import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'POST'],
});

type Catalog = 'mongodb';

const CATALOGS = ['mongodb'];

const URL = 'http://localhost:8080/v1/statement/';

const fetchUri = async (url: string) => {
    let nextUri = url;
    while (true) {
        const resp = await axios.get(nextUri);
        const data = resp.data;
        if (data['data']) {
            return { data: data['data'], error: null };
        } else if (data['nextUri']) {
            nextUri = data['nextUri'];
        } else if (data['error']) {
            return { data: null, error: data['errror'] };
        }
    }
};

const fetchQuery = async (query: string, catalog: Catalog) => {
    try {
        const resp = await axios({
            method: 'post',
            url: URL,
            headers: {
                'X-Trino-User': 'sr1jan',
                'X-Trino-Source': 'comviz',
                'X-Trino-Catalog': catalog,
            },
            data: query,
        });
        const info = resp.data;
        const { data, error } = await fetchUri(info['nextUri']);
        return { data, error };
    } catch (err) {
        return { data: null, error: err };
    }
};

function corsMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: () => Promise<any>,
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Cors middleware
    await corsMiddleware(req, res, cors);

    const { query } = req.query;
    const { data, error } = await fetchQuery(query, 'mongodb');
    if (error) {
        return res.status(404).json({ error: error });
    } else {
        return res.status(200).json({ data: data });
    }
};

export default handler;
