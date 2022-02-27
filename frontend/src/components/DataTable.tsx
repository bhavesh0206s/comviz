export default function DataTable({ data }: { data: any }) {
    try {
        const x = data.map((item) => Object.values(item)[0]);
        const y = data.map((item) => Object.values(item)[1]);
        const xLabel = data.map((item) => Object.keys(item)[0])[0];
        const yLabel = data.map((item) => Object.keys(item)[1])[1];
    } catch (e) {}

    try {
        return (
            <div className=" h-96 w-full overflow-y-auto py-4">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="sticky top-0">
                            <tr>
                                <th></th>
                                <th>{xLabel}</th>
                                <th>{yLabel}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {x.map((item, i) => (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{item}</td>
                                    <td>{y[i]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } catch (e) {
        return null;
    }
}
