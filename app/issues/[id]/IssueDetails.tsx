import { IssueStatusBadge } from '@/app/components';
import PriorityBadge from '@/app/components/PriorityBadge';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap='2' align='center' wrap='wrap'>
				<IssueStatusBadge status={issue.status} />
				<PriorityBadge priority={issue.priority} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className='prose max-w-full'>
				<Markdown>{issue.description}</Markdown>
			</Card>
		</>
	);
};

export default IssueDetails;
