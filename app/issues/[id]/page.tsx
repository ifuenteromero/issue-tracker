import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
	const issueId = parseInt(params.id);
	if (typeof issueId !== 'number' || isNaN(issueId)) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id: issueId },
	});

	if (!issue) notFound();
	return (
		<Flex direction='column' gap='2' maxWidth='40rem'>
			<Heading>{issue.title}</Heading>
			<Flex gap='2' align='center' wrap='wrap'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card>{issue.description}</Card>
		</Flex>
	);
};

export default IssueDetailPage;
