'use client';

import endpoints from '@/app/api/endpoints';
import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, isLoading, error } = useUsers();

	if (error) return null;
	if (isLoading) return <Skeleton height='2rem' />;

	const unassignedOption = 'Unassigned';

	const assignIssue = (userId: string) => {
		const assignedUserId = userId === unassignedOption ? null : userId;
		toast.promise(
			axios.patch(endpoints.issueDetail(issue.id.toString()), {
				assignedUserId,
			}),
			{
				loading: 'Saving...',
				success: 'Saved!',
				error: 'Failed to save',
			}
		);
	};

	return (
		<>
			<Select.Root
				onValueChange={assignIssue}
				defaultValue={issue.assignedUserId || unassignedOption}
			>
				<Select.Trigger placeholder='Assign...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value={unassignedOption}>
							Unassigned
						</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () =>
			axios.get<User[]>(endpoints.users).then((res) => res.data),
		staleTime: 60 * 1000, // 60s
		refetchOnWindowFocus: false,
		retry: 3,
	});

export default AssigneeSelect;
