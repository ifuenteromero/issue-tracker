import { Skeleton, Table } from '@radix-ui/themes';
import IssueActions from '../IssueActions';

const LoadingIssuePage = () => {
	const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
							<Table.Row key={issue}>
								<Table.Cell>
									<Skeleton />
									<div className='block md:hidden'>
										<Skeleton />
									</div>
								</Table.Cell>
								<Table.Cell className='hidden md:table-cell'>
									<Skeleton />
								</Table.Cell>
								<Table.Cell className='hidden md:table-cell'>
									<Skeleton />
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default LoadingIssuePage;
