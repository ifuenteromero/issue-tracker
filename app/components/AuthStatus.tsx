'use client';

import { Avatar, DropdownMenu, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import routes from '../utils/routes';

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading')
		return <Avatar fallback='?' size='2' src='L' radius='full' />;

	if (status === 'unauthenticated')
		return (
			<Link className='nav-link' href={routes.login}>
				Sign in
			</Link>
		);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar
					src={session!.user!.image!}
					fallback='?'
					referrerPolicy='no-referrer'
					size='2'
					radius='full'
					className='cursor-pointer'
				/>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Label>
					<Text size='2'>{session!.user?.email}</Text>
				</DropdownMenu.Label>
				<DropdownMenu.Item className='!px-0'>
					<Link
						className='w-full h-full flex items-center px-3 cursor-pointer'
						href={routes.logout}
					>
						Sign out
					</Link>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default AuthStatus;
