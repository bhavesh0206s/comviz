import { BarDatum, ResponsiveBar } from '@nivo/bar';
export default function BarGraph({
    data,
    indexBy,
}: {
    data: BarDatum[];
    indexBy: string;
}) {
    return (
        <ResponsiveBar
            data={data}
            keys={['degress']}
            indexBy={indexBy}
            margin={{ top: 50, right: 0, bottom: 220, left: 50 }}
            padding={0.4}
            valueScale={{ type: 'linear' }}
            colors="#3182CE"
            labelSkipWidth={12}
            labelSkipHeight={12}
            theme={{ fontSize: 16, textColor: 'white' }}
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'degrees',
                legendPosition: 'middle',
                legendOffset: -40,
            }}
        />
    );
}
