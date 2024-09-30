import routes from '@/app/utils/routes';
import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
	const container: {
		label: string;
		value: number;
		status: Status;
	}[] = [
		{
			label: 'Open Issues',
			value: open,
			status: 'OPEN',
		},
		{
			label: 'In Progress Issues',
			value: inProgress,
			status: 'IN_PROGRESS',
		},
		{
			label: 'Closed Issues',
			value: closed,
			status: 'CLOSED',
		},
	];

	return (
		<Flex gap='4'>
			{container.map(({ label, status, value }) => (
				<Card key={status}>
					<Link href={routes.issuesByStatus(status)}>
						<Flex direction='column' gap='1'>
							<Text className='font-medium text-sm'>{label}</Text>
							<Text size='5' className='font-bold'>
								{value}
							</Text>
						</Flex>
					</Link>
				</Card>
			))}
		</Flex>
	);
};

export default IssueSummary;
