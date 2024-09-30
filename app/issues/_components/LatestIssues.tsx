import { IssueStatusBadge } from '@/app/components';
import routes from '@/app/utils/routes';
import { prisma } from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';

const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: 5,
		include: {
			assignedUser: true,
		},
	});
	return (
		<Card>
			<Heading className='p-3' size='4'>
				Latest Issues
			</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => {
						return (
							<Table.Row key={issue.id}>
								<Table.Cell>
									<Flex align='center' justify='between'>
										<Flex
											direction='column'
											gap='2'
											align='start'
										>
											<Link
												href={routes.issueDetail(
													issue.id.toString()
												)}
											>
												{issue.title}
											</Link>
											<IssueStatusBadge
												status={issue.status}
											/>
										</Flex>
										{issue.assignedUser && (
											<Avatar
												src={issue.assignedUser.image!}
												fallback='?'
												size='2'
												radius='full'
												title={issue.assignedUser.name!}
											/>
										)}
									</Flex>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssues;
