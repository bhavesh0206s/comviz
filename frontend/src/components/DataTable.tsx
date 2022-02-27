export default function DataTable({ data }: { data: any[] }) {
    try {
        return (
            <div className=" h-96 w-full overflow-y-auto py-4">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="sticky top-0">
                            <tr>
                                {Object.keys(data).map((item) => (
                                    <th key={item}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data[Object.keys(data)[0]].map((item, i) => (
                                <tr key={i}>
                                    {Object.keys(data).map((ele) => (
                                        <td key={item}>{data[ele][i]}</td>
                                    ))}
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
