import routes from '@/app/utils/routes';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueActions from '../IssueActions';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div className='space-y-5'>
			<IssueActions />
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							State
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							Created
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => {
						return (
							<Table.Row key={issue.id}>
								<Table.Cell>
									<Link
										href={routes.issueDetail(
											issue.id.toString()
										)}
									>
										{issue.title}
									</Link>
									<div className='block md:hidden'>
										<IssueStatusBadge
											status={issue.status}
										/>
									</div>
								</Table.Cell>
								<Table.Cell className='hidden md:table-cell'>
									<IssueStatusBadge status={issue.status} />
								</Table.Cell>
								<Table.Cell className='hidden md:table-cell'>
									{issue.createdAt.toDateString()}
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default IssuesPage;
