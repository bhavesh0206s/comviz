export interface DashboardInterface {
    id: string;
    timestamp: number;
    title: string;
    cover: string;
    username: string;
    query: string;
    data: { [key: string]: any }[];
}
