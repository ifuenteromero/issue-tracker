import { IssueStatusBadge, Link } from '@/app/components';
import routes from '@/app/utils/routes';
import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { FaArrowUp } from 'react-icons/fa6';
import IssueActions from '../IssueActions';

interface Props {
	searchParams: {
		status: Status;
		orderBy: keyof Issue;
	};
}

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;
	const issues = await prisma.issue.findMany({ where: { status } });
	const session = await auth();

	const columns: { label: string; className?: string; value: keyof Issue }[] =
		[
			{
				label: 'Issue',
				value: 'title',
			},
			{
				label: 'State',
				value: 'status',
				className: 'hidden md:table-cell',
			},
			{
				label: 'Created',
				value: 'createdAt',
				className: 'hidden md:table-cell',
			},
		];

	return (
		<div className='space-y-5'>
			{session?.user && <IssueActions />}
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell key={column.label}>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
										},
									}}
									className='w-full inline-flex items-center'
								>
									{column.label}
									{column.value === searchParams.orderBy && (
										<FaArrowUp className='inline ml-1' />
									)}
								</NextLink>
							</Table.ColumnHeaderCell>
						))}
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

export const dynamic = 'force-dynamic';
// export const revalidate = 30;

export default IssuesPage;
