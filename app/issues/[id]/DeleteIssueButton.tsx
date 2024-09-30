'use client';

import endpoints from '@/app/api/endpoints';
import { Spinner } from '@/app/components';
import routes from '@/app/utils/routes';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteIssue = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(endpoints.issueDetail(issueId.toString()));
			router.push(routes.issues);
			router.refresh();
		} catch (error) {
			setError(true);
			setIsDeleting(false);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button disabled={isDeleting} color='red'>
						Delete Issue {isDeleting && <Spinner />}
					</Button>
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
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						This issue could not be deleted.
					</AlertDialog.Description>
					<Button
						mt='2'
						variant='soft'
						color='gray'
						onClick={() => setError(false)}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
