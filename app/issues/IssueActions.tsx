import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import routes from '../utils/routes';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
	return (
		<Flex justify='between'>
			<IssueStatusFilter />
			<Button>
				<Link href={routes.newIssue}>New Issue</Link>
			</Button>
		</Flex>
	);
};

export default IssueActions;
