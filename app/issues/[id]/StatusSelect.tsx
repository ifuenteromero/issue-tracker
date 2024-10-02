'use client';

import endpoints from '@/app/api/endpoints';
import { statusMap } from '@/app/components/IssueStatusBadge';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const StatusSelect = ({ issue }: { issue: Issue }) => {
	const statuses: { label: string; status: Status }[] = Object.entries(
		statusMap
	).map(([status, { label }]) => ({ label, status: status as Status }));

	const changeStatus = async (value: Status) => {
		const endpoint = endpoints.issueDetail(issue.id.toString());
		toast.promise(
			axios.patch(endpoint, {
				status: value,
			}),
			{
				loading: 'Updating status...',
				success: 'Status updated!',
				error: 'Failed to update status',
			}
		);
	};

	return (
		<>
			<Select.Root
				onValueChange={changeStatus}
				defaultValue={issue.status}
			>
				<Select.Trigger placeholder='Status...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						{statuses.map(({ label, status }) => (
							<Select.Item key={status} value={status}>
								{label}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

export default StatusSelect;
