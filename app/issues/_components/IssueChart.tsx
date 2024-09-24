'use client';

import { Card } from '@radix-ui/themes';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	XAxis,
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
			'In Progress': inProgress,
			Open: open,
			Closed: closed,
		},
	];
	return (
		<Card className='!pt-10 !pb-5 !pr-10'>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart
					data={data}
					margin={{
						right: 0,
						left: 0,
					}}
					barGap={20}
				>
					<CartesianGrid strokeDasharray='6 6' />
					<YAxis />
					<XAxis tickFormatter={(tick) => (tick === 0 ? '' : tick)} />
					<Legend
						wrapperStyle={{
							marginLeft: '2.5rem',
						}}
					/>
					<Bar dataKey='Open' barSize={40} fill='#c40006d3' />
					<Bar barSize={40} dataKey='In Progress' fill='#1f0099af' />
					<Bar barSize={40} dataKey='Closed' fill='#00713fde' />
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};

export default IssueChart;
