'use client';

import endpoints from '@/app/api/endpoints';
import { Issue, Status, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, isLoading, error } = useUsers();
	const router = useRouter();

	if (error) return null;
	if (isLoading) return <Skeleton height='2rem' />;

	const prevUser = issue.assignedUserId;

	const unassignedOption = 'Unassigned';

	const assignUser = (userId: string) => {
		const assignedUserId = userId === unassignedOption ? null : userId;

		const status = (() => {
			// si estaba desasignado y le asigno un usuario, lo pongo en progreso
			// Si lo tenía otro user y le cambio el user, no hago nada
			const isUnassigned = prevUser === null;
			if (isUnassigned && assignedUserId) return Status.IN_PROGRESS;
			// Si estaba asignado y no estaba closed y lo desasigno, lo pongo en abierto
			if (prevUser && issue.status !== Status.CLOSED && !assignedUserId)
				return Status.OPEN;
		})();

		toast.promise(
			axios
				.patch(endpoints.issueDetail(issue.id.toString()), {
					assignedUserId,
					status,
				})
				.then(() => router.refresh()),
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
				onValueChange={assignUser}
				defaultValue={prevUser || unassignedOption}
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
