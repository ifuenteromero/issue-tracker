'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const defaultOption = 'All';

const statuses: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
	const router = useRouter();
	const params = useSearchParams();
	const status = params.get('status');

	const onChangeStatus = (statusValue: Status | 'All') => {
		const query =
			statusValue === defaultOption ? '' : `?status=${statusValue}`;
		router.push(`/issues${query}`);
	};

	return (
		<Select.Root
			onValueChange={onChangeStatus}
			defaultValue={status || defaultOption}
		>
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
