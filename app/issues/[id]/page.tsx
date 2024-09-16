import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
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
		<Grid columns={{ initial: '1', sm: '5' }} gap='5'>
			<Flex direction='column' gap='2' className='md:col-span-4 '>
				<IssueDetails issue={issue} />
			</Flex>
			<Flex direction='column' gap='4'>
				<EditIssueButton issueId={params.id} />
				<DeleteIssueButton issueId={parseInt(params.id)} />
			</Flex>
		</Grid>
	);
};

export default IssueDetailPage;
