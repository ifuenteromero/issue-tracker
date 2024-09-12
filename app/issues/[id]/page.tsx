import { IssueStatusBadge } from '@/app/components';
import routes from '@/app/utils/routes';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import Markdown from 'react-markdown';

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
				<Heading>{issue.title}</Heading>
				<Flex gap='2' align='center' wrap='wrap'>
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className='prose'>
					<Markdown>{issue.description}</Markdown>
				</Card>
			</Flex>
			<Box>
				<Button className='!cursor-pointer !p-0'>
					<Link
						href={routes.editIssue(params.id)}
						className='flex items-center gap-2 h-full px-3'
					>
						<HiOutlinePencilSquare />
						Edit Issue
					</Link>
				</Button>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
