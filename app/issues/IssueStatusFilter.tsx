'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const defaultOption = 'All';

const statuses: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
	return (
		<Select.Root onValueChange={(value) => console.log({ value })}>
			<Select.Trigger
				className='!cursor-pointer'
				placeholder='Filter by status'
			/>
			<Select.Content>
				{statuses.map(({ label, value }) => (
					<Select.Item key={label} value={value || defaultOption}>
						{label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;
