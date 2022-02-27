import { DashboardInterface } from 'src/types';

export const storeDashboard = async (data: DashboardInterface) => {
    try {
        const dashboards = await localStorage.getItem('dashboards');
        let updatedDashboards: [] | object[] = dashboards
            ? (JSON.parse(dashboards) as object[])
            : [];
        updatedDashboards = updatedDashboards.concat(data);
        await localStorage.setItem(
            'dashboards',
            JSON.stringify(updatedDashboards),
        );
    } catch (err) {
        throw err;
    }
};

export const getDashboard = async (id: string) => {
    try {
        const dashboards = await localStorage.getItem('dashboards');
        if (typeof dashboards === null) return null;
        const data = JSON.parse(dashboards);
        const item = data.filter((item: any) => (item.id = id));
        if (item.length) return item[0];
        else return null;
    } catch (err) {
        throw err;
    }
};
