import { IssueStatusBadge, Link } from '@/app/components';
import PriorityBadge from '@/app/components/PriorityBadge';
import routes from '@/app/utils/routes';
import { Issue, Status } from '@prisma/client';
import { Table, Text } from '@radix-ui/themes';
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
											page: '1',
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
					const issueId = issue.id.toString();
					return (
						<Table.Row
							key={issue.id}
							className='cursor-pointer hover:bg-gray-50'
						>
							<Cell issueId={issueId}>
								<Text>{issue.title}</Text>
								<div className='flex gap-2 mt-2 md:hidden'>
									<IssueStatusBadge status={issue.status} />
									<PriorityBadge priority={issue.priority} />
								</div>
							</Cell>
							<Cell
								issueId={issueId}
								className='hidden md:table-cell'
							>
								<IssueStatusBadge status={issue.status} />
							</Cell>
							<Cell
								issueId={issueId}
								className='hidden md:table-cell'
							>
								{issue.createdAt.toDateString()}
							</Cell>
							<Cell
								issueId={issueId}
								className='hidden md:table-cell '
							>
								<PriorityBadge priority={issue.priority} />
							</Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.Root>
	);
};

interface CellProps extends Table.CellProps {
	issueId: string;
}

const Cell = ({ issueId, children, ...props }: CellProps) => {
	return (
		<Table.Cell style={{ padding: '0' }} {...props}>
			<Link
				radixLinkProps={{
					style: { color: 'unset' },
					className:
						'!p-3 !flex !flex-col md:!flex-row md:!justify-start hover:!no-underline',
				}}
				href={routes.issueDetail(issueId)}
				newTab={false}
			>
				{children}
			</Link>
		</Table.Cell>
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
		sortDirection: 'desc',
	},
	{
		label: 'Created',
		value: 'createdAt',
		className: 'hidden md:table-cell',
		sortDirection: 'desc',
	},
	{
		label: 'Priority',
		value: 'priority',
		className: 'hidden md:table-cell',
		sortDirection: 'desc',
	},
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
