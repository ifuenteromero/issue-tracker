'use client';

import endpoints from '@/app/api/endpoints';
import routes from '@/app/utils/routes';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();

	const deleteIssue = async () => {
		await axios.delete(endpoints.issueDetail(issueId.toString()));
		router.push(routes.issues);
		router.refresh();
	};

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color='red'>Delete Issue</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
				<AlertDialog.Description>
					Are you sure you want to delete this issue? This action
					cannot be undone.
				</AlertDialog.Description>
				<Flex mt='4' gap='3'>
					<AlertDialog.Cancel>
						<Button variant='soft' color='gray'>
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button onClick={deleteIssue} color='red'>
							Delete Issue
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

export default DeleteIssueButton;
