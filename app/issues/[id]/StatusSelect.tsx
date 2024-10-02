'use client';

import endpoints from '@/app/api/endpoints';
import { statusMap } from '@/app/components/IssueStatusBadge';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';

const StatusSelect = ({ issue }: { issue: Issue }) => {
	const statuses: { label: string; status: Status }[] = Object.entries(
		statusMap
	).map(([status, { label }]) => ({ label, status: status as Status }));

	const changeStatus = async (value: Status) =>
		await axios.patch(endpoints.issueDetail(issue.id.toString()), {
			status: value,
		});

	return (
		<Select.Root onValueChange={changeStatus} defaultValue={issue.status}>
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
	);
};

export default StatusSelect;
