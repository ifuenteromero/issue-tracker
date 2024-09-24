import { prisma } from '@/prisma/client';
import { Flex } from '@radix-ui/themes';
import IssueSummary from './issues/_components/IssueSummary';
import LatestIssues from './issues/_components/LatestIssues';

const Home = async () => {
	const open = await prisma.issue.count({ where: { status: 'OPEN' } });
	const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
	const inProgress = await prisma.issue.count({
		where: { status: 'IN_PROGRESS' },
	});

	return (
		<Flex direction='column' gap='4'>
			<IssueSummary open={open} closed={closed} inProgress={inProgress} />
			<LatestIssues />
		</Flex>
	);
};

export default Home;
