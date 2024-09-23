import { IssueStatusBadge, Link } from '@/app/components';
import routes from '@/app/utils/routes';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { FaArrowUp } from 'react-icons/fa6';

export interface IssueQuery {
	status: Status;
	orderBy: keyof Issue;
	sortDirection: direction;
	page: string;
}

interface Props {
	searchParams: IssueQuery;
	issues: Issue[];
}

type direction = 'asc' | 'desc';

const IssueTable = ({ searchParams, issues }: Props) => {
	const toggleDirection = (dir: direction) =>
		dir === 'asc' ? 'desc' : 'asc';

	return (
		<Table.Root variant='surface'>
			<Table.Header>
				<Table.Row>
					{columns.map((column) => {
						const isSorted = column.value === searchParams.orderBy;
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
									<IssueStatusBadge status={issue.status} />
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
	);
};

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

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
