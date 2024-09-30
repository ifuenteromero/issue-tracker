import Pagination from '@/app/components/Pagination';
import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { Status } from '@prisma/client';

import IssueActions from '../IssueActions';
import IssueTable, { columnNames, IssueQuery } from '../_components/IssueTable';

interface Props {
	searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columnNames.includes(searchParams.orderBy)
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

	return (
		<div className='space-y-5'>
			{session?.user && <IssueActions />}
			<IssueTable searchParams={searchParams} issues={issues} />
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
