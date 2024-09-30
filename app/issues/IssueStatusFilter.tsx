'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

const defaultOption = 'All';

const IssueStatusFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const status = searchParams.get('status');
	const pathname = usePathname();

	const defaultValue = statuses.find((st) => st.value === status)
		? status
		: defaultOption;

	const onChangeStatus = (statusValue: Status | 'All') => {
		const params = new URLSearchParams(searchParams);
		statusValue === defaultOption
			? params.delete('status')
			: params.set('status', statusValue);
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<Select.Root onValueChange={onChangeStatus} value={defaultValue!}>
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
