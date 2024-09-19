'use client';

import endpoints from '@/app/api/endpoints';
import { User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = () => {
	const {
		data: users,
		isLoading,
		error,
	} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () =>
			axios.get<User[]>(endpoints.users).then((res) => res.data),
		staleTime: 60 * 1000, // 60s
		refetchOnWindowFocus: false,
		retry: 3,
	});

	if (error) return null;
	if (isLoading) return <Skeleton height='2rem' />;

	return (
		<Select.Root onOpenChange={(value) => console.log({ value })}>
			<Select.Trigger placeholder='Assign...' />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
