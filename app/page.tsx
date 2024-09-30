import { prisma } from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './issues/_components/IssueChart';
import IssueSummary from './issues/_components/IssueSummary';
import LatestIssues from './issues/_components/LatestIssues';

const Home = async () => {
	const open = await prisma.issue.count({ where: { status: 'OPEN' } });
	const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
	const inProgress = await prisma.issue.count({
		where: { status: 'IN_PROGRESS' },
	});

	const issueSummary = {
		open,
		closed,
		inProgress,
	};

	return (
		<Grid gap='5' columns={{ initial: '1', md: '2' }}>
			<Flex direction='column' gap='5'>
				<IssueSummary {...issueSummary} />
				<IssueChart {...issueSummary} />
			</Flex>
			<LatestIssues />
		</Grid>
	);
};

export const dynamic = 'force-dynamic';

export default Home;
