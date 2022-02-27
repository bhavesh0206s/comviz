import { DashboardInterface } from 'src/types';

export const storeDashboard = (data: DashboardInterface) => {
    try {
        const dashboards = localStorage.getItem('dashboards');
        let updatedDashboards: [] | object[] = dashboards
            ? (JSON.parse(dashboards) as object[])
            : [];
        updatedDashboards = updatedDashboards.concat(data);
        localStorage.setItem('dashboards', JSON.stringify(updatedDashboards));
    } catch (err) {
        throw err;
    }
};

export const getDashboard = (id: string) => {
    try {
        const dashboards = localStorage.getItem('dashboards');
        if (typeof dashboards === null) return null;
        const data = JSON.parse(dashboards);
        const item = data.filter((item: any) => (item.id = id));
        if (item.length) return item[0];
        else return null;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getDashboards = () => {
    try {
        const dashboards = localStorage.getItem('dashboards');
        if (typeof dashboards === null) return null;
        const data = JSON.parse(dashboards);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
