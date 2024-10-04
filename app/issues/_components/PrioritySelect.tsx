import { priorityMap } from '@/app/components/PriorityBadge';
import { Priority } from '@prisma/client';
import { Select, Text } from '@radix-ui/themes';
import { GoDot } from 'react-icons/go';

type PriorityOption = {
	label: (typeof priorityMap)[Priority]['label'];
	value: Priority;
	color: (typeof priorityMap)[Priority]['color'];
};

const PrioritySelect = ({ ...props }) => {
	const options: PriorityOption[] = Object.entries(priorityMap).map(
		([priority, { label, color }]) => ({
			label,
			value: priority as Priority,
			color,
		})
	);

	return (
		<Select.Root {...props}>
			<Select.Trigger
				style={{
					display: 'flex',
					width: '16rem',
				}}
				placeholder='Priority'
			/>
			<Select.Content>
				{options.map((option) => (
					<Select.Item key={option.value} value={option.value}>
						<Text>
							<GoDot
								color={option.color}
								className='inline-block mr-2'
							/>
							{option.label}
						</Text>
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default PrioritySelect;
