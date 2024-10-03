import { Priority } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const priorityMap: Record<
	Priority,
	{ label: string; color: 'red' | 'orange' | 'yellow' | 'green' }
> = {
	[Priority.LOW]: { label: 'When you have time', color: 'green' },
	[Priority.MEDIUM]: { label: 'For peace of mind', color: 'yellow' },
	[Priority.HIGH]: { label: 'Will save your day', color: 'orange' },
	[Priority.CRITICAL]: { label: 'Do it now!', color: 'red' },
};

const PriorityBadge = ({ priority }: { priority: Priority }) => {
	const { label, color } = priorityMap[priority];

	return (
		<Badge variant='outline' color={color}>
			{label}
		</Badge>
	);
};

export default PriorityBadge;
