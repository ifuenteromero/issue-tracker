import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import routes from '../utils/routes';

const IssueActions = () => {
	return (
		<div>
			<Button>
				<Link href={routes.newIssue}>New Issue</Link>
			</Button>
		</div>
	);
};

export default IssueActions;
