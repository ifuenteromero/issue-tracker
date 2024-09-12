import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
	const issueId = parseInt(params.id);
	if (typeof issueId !== 'number' || isNaN(issueId)) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id: issueId },
	});

	if (!issue) notFound();
	return (
		<Grid columns={{ initial: '1', md: '2' }} gapY='5'>
			<Flex direction='column' gap='2' className='max-w-xl'>
				<IssueDetails issue={issue} />
			</Flex>
			<Box>
				<EditIssueButton issueId={params.id} />
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
