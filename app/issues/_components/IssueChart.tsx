'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	YAxis,
} from 'recharts';

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}

const IssueChart = ({ closed, inProgress, open }: Props) => {
	const data = [
		{
			inProgress,
			open,
			closed,
		},
	];
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				data={data}
				margin={{
					right: 0,
					left: 0,
				}}
			>
				<CartesianGrid strokeDasharray='6 6' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey='open' barSize={60} fill='#c40006d3' />
				<Bar barSize={60} dataKey='inProgress' fill='#1f0099af' />
				<Bar barSize={60} dataKey='closed' fill='#00713fde' />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default IssueChart;
