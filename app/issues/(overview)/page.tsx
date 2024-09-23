import { IssueStatusBadge, Link } from '@/app/components';
import Pagination from '@/app/components/Pagination';
import routes from '@/app/utils/routes';
import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { FaArrowUp } from 'react-icons/fa6';
import IssueActions from '../IssueActions';

type direction = 'asc' | 'desc';

interface Props {
	searchParams: {
		status: Status;
		orderBy: keyof Issue;
		sortDirection: direction;
		page: string;
	};
}

const columns: {
	label: string;
	className?: string;
	value: keyof Issue;
	sortDirection?: direction;
}[] = [
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
		sortDirection: 'desc',
	},
];

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columns.some(
		(column) => column.value === searchParams.orderBy
	)
		? { [searchParams.orderBy]: searchParams.sortDirection }
		: undefined;

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;
	const where = { status };
	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		take: pageSize,
		skip: (page - 1) * pageSize,
	});

	const itemsCount = await prisma.issue.count({ where });

	const session = await auth();

	const toggleDirection = (dir: direction) =>
		dir === 'asc' ? 'desc' : 'asc';

	return (
		<div className='space-y-5'>
			{session?.user && <IssueActions />}
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => {
							const isSorted =
								column.value === searchParams.orderBy;
							const sortDirection = isSorted
								? toggleDirection(searchParams.sortDirection)
								: column.sortDirection || 'asc';
							return (
								<Table.ColumnHeaderCell
									className={column.className}
									key={column.label}
								>
									<NextLink
										href={{
											query: {
												...searchParams,
												orderBy: column.value,
												sortDirection,
											},
										}}
										className='w-full inline-flex items-center'
									>
										{column.label}
										{isSorted && (
											<FaArrowUp
												className={`inline ml-1 transition-transform duration-200 ease-out ${
													sortDirection === 'asc'
														? 'transform rotate-180'
														: 'transform rotate-0'
												}`}
											/>
										)}
									</NextLink>
								</Table.ColumnHeaderCell>
							);
						})}
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
			<Pagination
				itemsCount={itemsCount}
				currentPage={page}
				pageSize={pageSize}
			/>
		</div>
	);
};

export const dynamic = 'force-dynamic';
// export const revalidate = 30;

export default IssuesPage;
