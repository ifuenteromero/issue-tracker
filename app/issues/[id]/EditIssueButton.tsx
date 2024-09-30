import routes from '@/app/utils/routes';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

const EditIssueButton = ({ issueId }: { issueId: string }) => {
	return (
		<Button className='!cursor-pointer !p-0'>
			<Link
				href={routes.editIssue(issueId)}
				className='flex items-center gap-2 h-full px-3'
			>
				<HiOutlinePencilSquare />
				Edit Issue
			</Link>
		</Button>
	);
};

export default EditIssueButton;
