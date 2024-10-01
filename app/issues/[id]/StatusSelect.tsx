import { statusMap } from '@/app/components/IssueStatusBadge';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const StatusSelect = ({ issueStatus }: { issueStatus: Status }) => {
	const statuses: { label: string; status: Status }[] = Object.entries(
		statusMap
	).map(([status, { label }]) => ({ label, status: status as Status }));

	return (
		<Select.Root defaultValue={issueStatus}>
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
