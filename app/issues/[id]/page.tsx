import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import CloseEditionButton from './CloseEditionButton';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import StatusSelect from './StatusSelect';

interface Props {
	params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
	const issueId = parseInt(params.id);
	if (typeof issueId !== 'number' || isNaN(issueId)) notFound();

	const issue = await fetchIssue(issueId);

	if (!issue) notFound();

	const session = await auth();

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap='5'>
			<Flex direction='column' gap='2' className='md:col-span-4 '>
				<IssueDetails issue={issue} />
			</Flex>
			{session?.user && (
				<Flex direction='column' gap='4'>
					<CloseEditionButton />
					<AssigneeSelect issue={issue} />
					<StatusSelect issue={issue} />
					<EditIssueButton issueId={params.id} />
					<DeleteIssueButton issueId={parseInt(params.id)} />
				</Flex>
			)}
		</Grid>
	);
};

export const generateMetadata = async ({ params }: Props) => {
	const issue = await fetchIssue(parseInt(params.id));
	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
};

export default IssueDetailPage;
